const { request, response } = require('express');
const State = require('../models/state-appointment');
const Appointment = require('../models/appointment');

const index = async ( req = request, res = response ) => {
    try {
        const states = await State.find();
        res.json({
            status: true,
            result: states
        });
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const show = async ( req = request, res = response ) => {
    try {
        const uid = req.params.uid;
        const state = await State.findById( uid );
    
        if( !state ){
            return res.status(404).json({
                status: false,
                message: `No se ha podido encontrar datos del estado ${uid}`
            });
        }
    
        res.json({
            status: true,
            result: state
        });
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const store = async ( req = request, res = response ) => {
    try {
        const { name, description } = req.body;
    
        const state = new State({ name, description });
        state.save();

        res.json({
            status: true,
            message: `Estado ${ name } registrado correctamente.`,
            result: state
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
        const { name, description } = req.body;
        const { uid } = req.params;
    
        const state = await State.findByIdAndUpdate( uid, { name, description } );

        res.json({
            status: true,
            message: `Estado ${ name } actualizado correctamente.`,
            result: state
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
    
        //TODO: Validar que el estado no este asociado a una reserva
        const appointment = await Appointment.findOne({ state: uid });
        if( appointment ){
            return res.json({
                status: false,
                message: 'No se puede eliminar el estado porque se encuentra asociado a citas médicas.'
            });
        }

        const state = await State.findByIdAndDelete( uid );
    
        res.json({
            status: true,
            result: state,
            message: `Estado ${state.name} eliminado correctamente.`,
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