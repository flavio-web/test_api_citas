const { request, response } = require('express');
const Appointment = require('../models/appointment');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const State = require('../models/state-appointment');
const { sendMailDefault } = require('../helpers/send-email');
const { crearHtmlNotificacion } = require('../helpers/notification');

const index = async( req = request, res = response ) => {
    try {
        const appointment = await Appointment.find().sort({ date: 'asc' });//.populate('users');

        res.json({
            status: true,
            result: appointment,
        });
    } catch (error) {
        console.log( error );
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const show = async( req = request, res = response ) => {
    try {
        const { uid } = req.params;
        const appointment = await Appointment.findById( uid )
        .populate({
            path:'patient',
            select:'firsname lastname photo email address phone birthday'
        })
        .populate({
            path:'doctor',
            select: 'code user',
            populate: {
                path: 'user',
                select:'firstname lastname photo email address phone birthday'
            },
            populate: {
                path: 'speciality',
                select:'name state description'
            }
        })
        .populate('state', 'name')
        .populate({
            path: 'details.service',
            select: 'name speciality state',
            populate: {
                path: 'speciality',
                select:'name state description'
            }
        });

        if( !appointment ){
            return res.status(401).json({
                status: false,
                message: `No existe la cita médica con el identificador ${uid}.`
            });
        }

        res.json({
            status: true,
            result: appointment
        });
    } catch (error) {
        console.log( error );
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const store = async( req = request, res = response ) => {
    try {
        const { date, state, patient, doctor, observation, details } = req.body;

        //validar que el doctor se encuentra habilitado
        const dataDoctor = await Doctor.findById( doctor ).populate('user');
        if( !dataDoctor.state ){
            return res.status(401).json({
                status: false,
                message: `Médico ${dataDoctor.user.fullName} se encuentra deshabilitado.`
            });
        }

        const appointment = new Appointment({ date, state, patient, doctor, observation, details });
        appointment.save();

        const user_patient = await User.findById( patient );

        res.json({
            status: true,
            result: appointment,
            message: `Cita médica al paciente: ${user_patient.fullName} registrada correctamente.`
        });
    } catch (error) {
        console.log( error );
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const update = async( req = request, res = response ) => {
    try {
        const { uid } = req.params;
        const { date, state, patient, doctor, observation, details } = req.body;
        const updatedAt = Date.now();
       
        const appointment = await Appointment.findByIdAndUpdate( uid, { updatedAt, date, state, patient, doctor, observation, details } );

        const user_patient = await User.findById( patient );

        res.json({
            status: true,
            result: appointment,
            message: `Cita médica al paciente: ${user_patient.fullName} actualizada correctamente.`
        });
    } catch (error) {
        console.log( error );
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const updateState = async( req = request, res = response ) => {
    try {
        const { uid } = req.params;
        const { state } = req.body;
        const updatedAt = Date.now();
       
        const appointment = await Appointment.findByIdAndUpdate( uid, { updatedAt, state } ).populate('patient', ['firstname', 'lastname']).populate('state', ['name']);

        res.json({
            status: true,
            result: appointment,
            message: `Estado de la cita médica al paciente: ${(appointment.patient.fullName).toUpperCase()} actualizado a ${(appointment.state.name).toUpperCase()}.`
        });
    } catch (error) {
        console.log( error );
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const sendNotificationAppointment = async ( req = request, res = response ) => {
    try {
        const { uid } = req.params;
        const appointment = await Appointment.findById( uid ).populate('patient', ['firstname', 'lastname']).populate('state', ['name']);

        const from = '"Notificación Cita Medica 👻" <sodinfofacturacion@gmail.com>';
        const to = 'flavioromanweb@gmail.com, flaroval_2@hotmail.com';
        const subject = 'Hello ✔';
        const html = await crearHtmlNotificacion();

        await sendMailDefault( from, to, subject, html );
        res.json({
            status: true,
            message: `Notificación de cita médica al paciente: ${(appointment.patient.fullName).toUpperCase()} enviado correctamente.`
        });

    } catch (error) {
        console.log( error );
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    updateState,
    sendNotificationAppointment
}