const { request, response } = require('express');
const Appointment = require('../models/appointment');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const State = require('../models/state-appointment');
const { sendMailDefault } = require('../helpers/send-email');
const { crearHtmlNotificacion } = require('../helpers/notification');
const { convertImageToBase64 } = require('../helpers');

const index = async( req = request, res = response ) => {
    try {
        const appointments = await Appointment.find()
            .populate({
                path:'patient',
                select:'firstname lastname photo email address phone birthday'
            })
            .populate({
                path:'doctor',
                populate: {
                    path: 'user',
                    select:'firstname lastname photo email address phone birthday'
                },
            })
            .populate({
                path:'doctor',
                populate: {
                    path: 'speciality',
                    select:'name state description'
                }
            })
            .populate({
                path: 'state',
                select: 'name primary secondary'
            })
            .populate({
                path: 'details.service',
                select: 'name speciality state',
                populate: {
                    path: 'speciality',
                    select:'name state description'
                }
            })
            .sort({ date: 'asc' });

        await appointments.map(async (appointment) => {
            console.log(appointment);
            appointment.patient.photo = convertImageToBase64(appointment.patient.photo);
            appointment.doctor.user.photo = convertImageToBase64(appointment.doctor.user.photo);
            return appointment;
        });

        res.json({
            status: true,
            result: appointments,
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
            //select:'firstname lastname photo email address phone birthday'
        })
        .populate({
            path:'doctor',
            select: 'code state user',
            populate: {
                path: 'speciality user',
            },
        })
        .populate({
            path: 'state',
            select: 'name primary secondary'
        })
        .populate({
            path: 'details.service',
            //select: 'name speciality state',
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

        appointment.patient.photo = convertImageToBase64(appointment.patient.photo);
        appointment.doctor.user.photo = convertImageToBase64(appointment.doctor.user.photo);

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
        const { datestart, dateend, state, patient, doctor, observation, details } = req.body;

        if( Date.parse(dateend) <= Date.parse(datestart) ){
            return res.status(401).json({
                status: false,
                message: 'La fecha final debe ser mayor a la fecha inicial.'
            });
        }

        //validar que el doctor se encuentra habilitado
        const dataDoctor = await Doctor.findById( doctor ).populate('user');
        if( !dataDoctor.state ){
            return res.status(401).json({
                status: false,
                message: `Médico ${dataDoctor.user.fullName} se encuentra deshabilitado.`
            });
        }

        const appointment = new Appointment({ datestart, dateend, state, patient, doctor, observation, details });
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
        const { datestart, dateend, state, patient, doctor, observation, details } = req.body;
       
        if( Date.parse(dateend) <= Date.parse(datestart) ){
            return res.status(401).json({
                status: false,
                message: 'La fecha final debe ser mayor a la fecha inicial.'
            });
        }
        
        const appointment = await Appointment.findByIdAndUpdate( uid, { datestart, dateend, state, patient, doctor, observation, details } );

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
       
        const appointment = await Appointment.findByIdAndUpdate( uid, { updatedAt, state } )
        .populate('patient', ['firstname', 'lastname'])
        .populate('state', ['name'])
        .populate({
            path: 'doctor',
            select: 'user',
            populate: {
                path: 'user',
                select: 'firstname lastname photo email address phone birthday'
            },
        })
        ;

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

/***esta funcion no hacer ***/
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

const destroy = async( req = request, res = response ) => {
    try {

        const { uid } = req.params;

        const appointment = await Appointment.findByIdAndDelete( uid );

        res.json({
            status: true,
            result: appointment,
            message: `Cita médica eliminada correctamente.`
        });
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        });
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    updateState,
    destroy,
    sendNotificationAppointment
}