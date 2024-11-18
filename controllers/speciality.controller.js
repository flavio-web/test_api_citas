const { request, response } = require('express');
const Speciality = require('../models/specialty');
const Service = require('../models/service');
const Doctor = require('../models/doctor');

const index = async ( req = request, res = response ) => {
    const specialities = await Speciality.find();
    console.log( specialities );
    res.json({
        status: true,
        result: specialities
    });
}

const show = async ( req = request, res = response ) => {
    const uid = req.params.uid;
    const speciality = await Speciality.findById( uid );

    if( !speciality ){
        return res.status(404).json({
            status: false,
            message: `No se ha podido encontrar datos de la especialidad ${uid}`
        });
    }

    res.json({
        status: true,
        result: speciality
    });
}

const store = async ( req = request, res = response ) => {
    try {
        const { name, state, description } = req.body;
    
        const speciality = new Speciality({ name, state, description });
        speciality.save();

        res.json({
            status: true,
            message: `Especialidad ${ name } registrada correctamente.`,
            result: speciality
        });
        
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const update = async ( req = request, res = response ) => {
    try {
        const { name, state, description } = req.body;
        const { uid } = req.params;
    
        const speciality = await Speciality.findByIdAndUpdate( uid, { name, state, description } );

        res.json({
            status: true,
            message: `Especialidad ${ name } actualziada correctamente.`,
            result: speciality
        });
        
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const destroy = async( req = request, res = response ) => {

    try {
        const uid = req.params.uid;
    
        //TODO: Validar que la especialidad no este asociada a un servicio, doctor
        const service = await Service.findOne({ speciality: uid });
        if( service ){
            return res.json({
                status: false,
                message: 'No se puede eliminar la especialidad porque está asociada a un servicio.'
            });
        }

        const doctor = await Doctor.findOne({ speciality: uid });
        if( doctor ){
            return res.json({
                status: false,
                message: 'No se puede eliminar la especialidad porque está asociada a un doctor.'
            });
        }
    
        const speciality = await Speciality.findByIdAndDelete( uid );
    
        res.json({
            status: true,
            result: speciality,
            message: `Especialidad ${speciality.name} eliminada correctamente.`,
        })
        
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
    destroy
}