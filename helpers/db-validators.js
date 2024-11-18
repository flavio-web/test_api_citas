const mongoose = require('mongoose');
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Speciality = require("../models/specialty");
const State = require("../models/state-appointment");
const Service = require("../models/service");
const Appointment = require('../models/appointment');


const emailExiste = async ( email ) => {
    const user = await User.findOne({ email });
    if( user ){
        throw new Error(`El email ${email} ya se encuentra registrado.`);
    }
}

const existeUsuarioByUid = async ( uid ) => {
    
    if( mongoose.Types.ObjectId.isValid( uid ) ){
        const existeId = await User.findById( uid );

        if( !existeId ){
            throw new Error(`El UD ${uid} no existe.`);
        }
    }else{
        throw new Error(`El UID ${uid} no es válido.`);
    }
}

const existeSpecialityByUid = async ( uid ) => {
    if( mongoose.Types.ObjectId.isValid( uid ) ){
        const existeId = await Speciality.findById( uid );
        
        if( !existeId ){
            throw new Error(`El UD ${uid} no existe.`);
        }
    }else{
        throw new Error(`El UID ${uid} no es válido.`);
    }
}

const existeDoctorByUid = async ( uid ) => {
    if( mongoose.Types.ObjectId.isValid( uid ) ){
        const existeId = await Doctor.findById( uid );
        
        if( !existeId ){
            throw new Error(`El UD ${uid} no existe.`);
        }
    }else{
        throw new Error(`El UID ${uid} no es válido.`);
    }
}

const codeDoctorExiste = async ( code ) => {
    const doctor = await Doctor.findOne({ code });
    if( doctor ){
        throw new Error(`El código de médico ${code} ya se encuentra registrado.`);
    }
}

const existeStateAppointmentByUid = async ( uid ) => {
    if( mongoose.Types.ObjectId.isValid( uid ) ){
        const existeId = await State.findById( uid );
        
        if( !existeId ){
            throw new Error(`El UD ${uid} no existe.`);
        }
    }else{
        throw new Error(`El UID ${uid} no es válido.`);
    }
}

const existeServiceByUid = async ( uid ) => {
    if( mongoose.Types.ObjectId.isValid( uid ) ){
        const existeId = await Service.findById( uid );
        
        if( !existeId ){
            throw new Error(`El UD ${uid} no existe.`);
        }
    }else{
        throw new Error(`El UID ${uid} no es válido.`);
    }
}

const existeAppointmentByUid = async ( uid ) => {
    if( mongoose.Types.ObjectId.isValid( uid ) ){
        const existeId = await Appointment.findById( uid );
        
        if( !existeId ){
            throw new Error(`El UD ${uid} no existe.`);
        }
    }else{
        throw new Error(`El UID ${uid} no es válido.`);
    }
}
const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    if( !colecciones.includes( coleccion ) ){
        throw new Error(`La colección ${coleccion} no es permitida, (${colecciones}).`);
    }

    return true;
}

module.exports = {
    emailExiste,
    existeUsuarioByUid,
    coleccionesPermitidas,
    existeSpecialityByUid,
    existeDoctorByUid,
    codeDoctorExiste,
    existeStateAppointmentByUid,
    existeServiceByUid,
    existeAppointmentByUid
}