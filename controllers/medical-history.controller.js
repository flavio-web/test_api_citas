const { request, response } = require('express');
const Appointment = require('../models/appointment');
const User = require('../models/user');


const getMedicalHistoryByUser = async (req = request, res = response) => {
    try {
        const { uid } = req.params;
        const { datestart, dateend } = req.query;
        console.log({
            datestart,
            dateend
        })
        let result = [];
        if( datestart && dateend ){
            console.log("entra a las fechas");
            if( Date.parse(datestart) > Date.parse(dateend) ) {
                return res.json({
                    status: false,
                    message: `Fecha incial ${datestart} debe ser menor o igual a la fecha final ${dateend}`,
                });
            }


            const fechaInicio = new Date(`${datestart}T00:00:00.000Z`);
            const fechaFin = new Date(`${dateend}T23:59:59.000Z`);
            result = await Appointment.find({
                $and: [
                    {
                        datestart: {
                            $gte: fechaInicio,
                            $lte: fechaFin
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
                select: 'code',
                populate: {
                    path: 'speciality user',
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
                   /*  {
                        state: (stateTerminado._id).toString()
                    }  */
                ]
            }).populate({
                path:'patient',
                select:'firstname lastname photo email address phone birthday'
            })
            .populate({
                path:'doctor',
                select: 'code',
                populate: {
                    path: 'speciality user',
                }
            })
            .populate({
                path: 'state',
            })
            .populate({
                path: 'details.service',
                select: 'name speciality state',
                populate: {
                    path: 'speciality',
                    select:'name state description'
                }
            })
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
    getMedicalHistoryByUser
}