const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
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
        this.dashboardPath = '/api/dashboard';

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

        /* const allowedOrigins = [
            'http://localhost:8100', // Tu aplicación Ionic local
            'https://ea4a-2800-bf0-b009-103c-a47d-b730-e1e7-e4ec.ngrok-free.app' // Tu servidor ngrok
        ];

        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
            allowedHeaders: ['Content-Type', 'Authorization', 'x-token', 'Accept', 'Access-control-allow-origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers'], // Permite el encabezado x-token
            preflightContinue: false, // Deja que Express maneje la solicitud preflight
            optionsSuccessStatus: 204 // Para manejar correctamente la respuesta de la solicitud OPTIONS
        }));
        this.app.options('*', cors()); */
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use( express.static('public') );
        this.app.use( express.json() );
        this.app.use(this.uploadPath, express.static(path.join(__dirname, 'uploads')));

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
        this.app.use(this.dashboardPath, require('../routes/dashboard.route.js') );
    }

    listen(){
        this.app.listen(this.port, '0.0.0.0', () => {
            console.log(`Server running on http://0.0.0.0:${this.port}`);
        });
        /* this.app.listen( this.port, () => {
            console.log(`Api Citas Medicas - Express ejecutanose en el puerto: ${this.port}`)
        }) */
    }
}

module.exports = Server;