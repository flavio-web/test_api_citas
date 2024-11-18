const { request, response } = require('express');
const Appointment = require('../models/appointment');
const User = require('../models/user');
const State = require('../models/state-appointment');

const getMedicalHistoryByUser = async ( req = request, res = response ) => {
    try {
        const { uid } = req.params;
        const { dateStart, dateEnd } = req.body;

        //{"name":/^terminado$/i} --> para poder usar el nombre en lowervase y pueda ser encontrado igual mediante rgex
        const stateTerminado = await State.findOne({ name: 'Terminado' }); 
        console.log(stateTerminado);
        console.log( (stateTerminado._id).toString() );
        if( !stateTerminado ){
            return res.status(500).json({
                status: false,
                message: `Estado TERMINADO no se necuentra en los registros de la base de datos`
            });
        }

        let result = [];
        if( dateStart && dateEnd ){
            if( Date.parse(dateStart) > Date.parse(dateEnd) ) {
                return res.json({
                    status: false,
                    message: `Fecha incial ${dateStart} debe ser menor o igual a la fecha final ${dateEnd}`,
                });
            }

            const fechaInicio = `${dateStart} 00:00:00`;
            const fechaFin = `${dateEnd} 23:59:59`;
            result = await Appointment.find({
                $and: [
                    {
                        date: {
                            $gte: new Date(fechaInicio),
                            $lte: new Date(fechaFin)
                        }
                    },
                    {
                        patient: uid
                    },
                    {
                        state: (stateTerminado._id).toString()
                    } 
                ]
            }).populate({
                path:'patient',
                select:'firstname lastname photo email address phone birthday'
            })
            .populate({
                path:'doctor',
                select: 'code user',
                populate: {
                    path: 'user',
                    select:'firsname lastname photo email address phone birthday'
                },
                populate: {
                    path: 'speciality',
                    select:'name state description'
                }
            })
            .populate({
                path: 'state', 
                select: 'name', 
                /* match: { 
                    $and: [
                        {
                            name: 'Terminado'
                        }
                    ]
                   
                } */
            })
            .populate({
                path: 'details.service',
                select: 'name speciality state',
                populate: {
                    path: 'speciality',
                    select:'name state description'
                }
            });

            /* const result = await Appointment.aggregate([
                {
                  $match: {
                    _id: ObjectId(id),
                  },
                },
                {
                  $lookup: {
                    from: "userstories",
                    localField: "Userstories",
                    foreignField: "_id",
                    as: "Userstories",
                  },
                },
              ]); */

        }else{
            result = await Appointment.find({
                $and: [
                    {
                        patient: uid
                    },
                    {
                        state: (stateTerminado._id).toString()
                    } 
                ]
            });
        }
       
        if( !result || result.length === 0 ){
            const patient = await User.findById( uid );
            return res.json({
                status: false,
                message: `No existe historial medico del paciente: ${(patient.fullName).toUpperCase()}`,
            });
        }

        res.json({
            status: true,
            result
        });
    } catch (error) {
        console.log( error );
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const getAllAppointmentByUser = async( req = request, res = response ) => {
    try {
        const { uid } = req.params;
        const { dateStart, dateEnd } = req.body;
        
        let result = [];
        if( dateStart && dateEnd ){
            if( Date.parse(dateStart) > Date.parse(dateEnd) ) {
                return res.json({
                    status: false,
                    message: `Fecha incial ${dateStart} debe ser menor o igual a la fecha final ${dateEnd}`,
                });
            }

            const fechaInicio = `${dateStart} 00:00:00`;
            const fechaFin = `${dateEnd} 23:59:59`;
            result = await Appointment.find({
                $and: [
                    {
                        date: {
                            $gte: new Date(fechaInicio),
                            $lte: new Date(fechaFin)
                        }
                    },
                    {
                        patient: uid
                    }
                ]
            }).populate({
                path:'patient',
                select:'firstname lastname photo email address phone birthday'
            })
            .populate({
                path:'doctor',
                select: 'code user',
                populate: {
                    path: 'user',
                    select:'firsname lastname photo email address phone birthday'
                },
                populate: {
                    path: 'speciality',
                    select:'name state description'
                }
            })
            .populate({
                path: 'state', 
                select: 'name', 
            })
            .populate({
                path: 'details.service',
                select: 'name speciality state',
                populate: {
                    path: 'speciality',
                    select:'name state description'
                }
            });

        }else{
            result = await Appointment.find({
                $and: [
                    {
                        patient: uid
                    },
                    {
                        state: (stateTerminado._id).toString()
                    } 
                ]
            }).populate({
                path:'patient',
                select:'firstname lastname photo email address phone birthday'
            })
            .populate({
                path:'doctor',
                select: 'code user',
                populate: {
                    path: 'user',
                    select:'firsname lastname photo email address phone birthday'
                },
                populate: {
                    path: 'speciality',
                    select:'name state description'
                }
            })
            .populate({
                path: 'state', 
                select: 'name', 
            })
            .populate({
                path: 'details.service',
                select: 'name speciality state',
                populate: {
                    path: 'speciality',
                    select:'name state description'
                }
            });
        }
       
        if( !result || result.length === 0 ){
            const patient = await User.findById( uid );
            return res.json({
                status: false,
                message: `No existe historial medico del paciente: ${(patient.fullName).toUpperCase()}`,
            });
        }

        res.json({
            status: true,
            result
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
    getMedicalHistoryByUser,
    getAllAppointmentByUser
}