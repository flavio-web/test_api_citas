const { request, response } = require('express');
const Service = require('../models/service');
const Appointment = require('../models/appointment');

const index = async( req = request, res = response ) => {
    try {
        const services = await Service.find();

        res.json({
            status: true,
            result: services
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
        const service = await Service.findById( uid );

        if( !service ){
            return res.status(401).json({
                status: false,
                message: `No existe el servicio con el identificador ${uid}.`
            });
        }

        res.json({
            status: true,
            result: service
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
        const { name, price, discount, description, state, speciality } = req.body;
        const service = new Service({ name, price, discount, description, state, speciality });
        service.save();

        res.json({
            status: true,
            result: service,
            message: `Servicio ${name} registrado correctamente.`
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
        const { name, price, discount, description, state, speciality } = req.body;
       
        const service = await Service.findByIdAndUpdate( uid, { name, price, discount, description, state, speciality } );

        res.json({
            status: true,
            result: service,
            message: `Servicio ${name} actualizado correctamente.`
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
       
        //TODO: Validar que el servicio no este asociado a una reserva para poder ser eliminado

        const appointment = await Appointment.findOne({ 'details.service': uid });
        if( appointment ){
            return res.json({
                status: false,
                message: 'No se puede eliminar el servicio porque tiene registros médicos.'
            });
        }
        const service = await Service.findByIdAndDelete( uid );

        res.json({
            status: true,
            result: service,
            message: `Servicio ${service.name} eliminado correctamente.`
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
    destroy
}