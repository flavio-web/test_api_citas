const { request, response } = require('express');
const Doctor = require('../models/doctor');
const User = require('../models/user');
const Appointment = require('../models/appointment');
const { convertImageToBase64 } = require('../helpers');

const index = async( req = request, res = response ) => {
    try {

        const doctors = await Doctor.find().populate('user').populate('speciality');

        await doctors.map(async (doctor) => {
            doctor.user.photo = convertImageToBase64(doctor.user.photo);
            return doctor;
        });

        res.json({
            status: true,
            result: doctors,
        });
        
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        });
    }
}

const show = async( req = request, res = response ) => {
    try {

        const { uid } = req.params;
        const doctor = await Doctor.findById( uid ).populate({
            path: 'user',
        }).populate('speciality');

        if( !doctor ){
            return res.status(404).json({
                status: false,
                message: `No se ha podido encontrar datos del doctor ${uid}`
            });
        }

        console.log( doctor );
        doctor.user.photo = convertImageToBase64(doctor.user.photo);

        res.json({
            status: true,
            result: doctor,
        });
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        });
    }
}

const store = async( req = request, res = response ) => {
    try {

        const { code, user, speciality, state } = req.body;
        const doctor = new Doctor({ code, user, speciality, state });
        doctor.save();

        const { firstname, lastname } = await User.findById( user );

        res.json({
            status: true,
            result: doctor,
            message: `Doctor ${firstname} ${lastname} registrado correctamente.`
        });
        
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        });
    }
}

const update = async( req = request, res = response ) => {
    try {

        const { uid } = req.params;
        const { code, user, speciality, state } = req.body;


        //validar si el code update esta registrado
        const doctorByCode = await Doctor.findOne({ code, _id: { $ne: uid } });
        if( doctorByCode ){
            return res.json({message: `El código de médico ${code} ya se encuentra registrado.`});
        }

        const doctor = await Doctor.findByIdAndUpdate(uid, { code, user, speciality, state });
        const { firstname, lastname } = await User.findById( user );

        res.json({
            status: true,
            result: doctor,
            message: `Doctor ${firstname} ${lastname} actualizado correctamente.`
        });
        
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        });
    }
}

const destroy = async( req = request, res = response ) => {
    try {

        //TODO: validar que el doctor no tenga asociado reservas o historial medico
        const { uid } = req.params;

        const appointment = await Appointment.findOne({ doctor: uid });
        if( appointment ){
            return res.json({
                status: false,
                message: 'No se puede eliminar el doctor porque tiene registros médicos.'
            });
        }

        const doctor = await Doctor.findByIdAndDelete( uid );
        const { firstname, lastname } = await User.findById( doctor.user );

        res.json({
            status: true,
            result: doctor,
            message: `Doctor ${firstname} ${lastname} eliminado correctamente.`
        });
        
    } catch (error) {
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
    destroy
}