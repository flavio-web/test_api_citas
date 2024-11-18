const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config.js');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.userPath = '/api/users';
        this.authPath = '/api/auth';
        this.uploadPath = '/api/uploads';
        this.specialtyPath = '/api/specialities';
        this.doctorPath = '/api/doctors';
        this.stateAppointmentPath = '/api/state-appointment';
        this.servicePath = '/api/services';
        this.appointmentPath = '/api/medical-appointments';
        this.medicalHistoryPath = '/api/medical-history';

        //conexion  DB
        this.connectDB();
        
        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){

        this.app.use( cors() );
        this.app.use( express.static('public') );
        this.app.use( express.json() );

        //carga de archivos
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user.route.js') );
        this.app.use(this.authPath, require('../routes/auth.route.js') );
        this.app.use(this.uploadPath, require('../routes/uploads.route.js') );
        this.app.use(this.specialtyPath, require('../routes/specialty.route.js') );
        this.app.use(this.doctorPath, require('../routes/doctor.route.js') );
        this.app.use(this.stateAppointmentPath, require('../routes/state-appointment.route.js') );
        this.app.use(this.servicePath, require('../routes/service.route.js') );
        this.app.use(this.appointmentPath, require('../routes/medical-appointment.route.js') );
        this.app.use(this.medicalHistoryPath, require('../routes/medical-history.route.js') );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Api Citas Medicas - Express ejecutanose en el puerto: ${this.port}`)
        })
    }
}

module.exports = Server;