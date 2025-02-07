const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const Specialty = require("../models/specialty");
const User = require("../models/user");


const index = async( req = request, res = response ) => {
    try {

        const users = await User.countDocuments();
        const doctors = await Doctor.countDocuments();
        const appointments = await Appointment.countDocuments();
        const specialities = await Specialty.countDocuments();
        console.log({
             users,
             doctors,
             appointments,
             specialities
        })
        return res.status( 200 ).json({
            status: true,
            result: {
                users,
                doctors,
                appointments,
                specialities
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}


module.exports = {
    index
}