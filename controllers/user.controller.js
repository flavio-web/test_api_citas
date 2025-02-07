const { request, response } = require('express');
const bcrypt = require('bcrypt');
const { uploadFile, destroyFile, convertImageToBase64 } = require('../helpers');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');
const fs = require('fs');
const path = require('path');
const { loadFile } = require('./upload.controller');

const index = async( req = request, res = response ) => {
    try{

        /* const { limit = 10, skip = 0 } = req.query;
    
        const [ result, total ] = await Promise.all([
            User.find().limit( Number(limit) ).skip( Number(skip) ),
            User.countDocuments()
        ]); */

        const result = await User.find();

        await result.map( async ( user ) => {
            /* if (user.photo) {
                const photoPath = path.join(__dirname, '../uploads', 'users', user.photo);

                // Verifica si el archivo existe
                if (fs.existsSync(photoPath)) {
                    const extend = path.extname(user.photo);
                    const imageBuffer = fs.readFileSync(photoPath);
                    const imageBase64 = imageBuffer.toString('base64');
                    user.photo = `data:image/${extend};base64,${imageBase64}`; // Asumiendo que la imagen es PNG
                }else{
                    const pathImage = path.join( __dirname, '../uploads/no-image-user.png');
                    const image = fs.readFileSync(pathImage, { encoding: 'base64' });
                    user.photo = `data:image/jpeg;base64,${image}`;
                }
            }else{
                const pathImage = path.join(__dirname, '../uploads/no-image-user.png');
                const image = fs.readFileSync(pathImage, {
                    encoding: 'base64'
                });
                user.photo = `data:image/jpeg;base64,${image}`;
            } */

            user.photo = convertImageToBase64( user.photo );

            return user;
        });

        return res.json({
            status: true,
            result,
            //total
        });

    }catch (error) {
        console.log( error );
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const search = async ( req = request, res = response ) => {
    try {
        
        const { q, limit = 10 } = req.query;
    
        const users = await User.find({
            $or: [
                {
                    firstname: { $regex : new RegExp(q, "i") }
                },
                {
                    lastname: { 
                        $regex : new RegExp(q, "i"),
                        $caseSensitive: false,
                        $diacriticSensitive: false
                    } 
                },
                {
                    email: { $regex : new RegExp(q, "i") } 
                }
            ]
        }).limit( limit ).collation({"locale" : "es", "strength" : 1});

        if( !users || users.length === 0 ){
            return res.status(400).json({
                status: false,
                message: `No se han encontrado usuarios con la coincidencia ${q}`
            });
        }

        await users.map(async (user) => {
            user.photo = convertImageToBase64(user.photo);
            return user;
        });

        res.json({
            status: true,
            result: users
        });

    } catch (error) {
        console.log( error );
        return res.status(500).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        });
    }
}

const show = async( req = request, res = response ) => {
    try{

        const uid = req.params.uid;
        const result = await User.findById( uid );
    
        if( !result ){
            return res.status(404).json({
                status: false,
                message: `No se ha podido encontrar datos del usuario ${uid}`
            });
        }

        result.photo = convertImageToBase64(result.photo);
    
        res.json({
            status: true,
            result
        });
    }catch (error) {
        console.log( error );
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const store = async( req = request, res = response )  => {

    try{

        const {
            firstname,
            lastname,
            email,
            phone,
            password,
            photo,
            address,
            birthday,
            isAdmin
        } = req.body;
    
        let uploadPath = '';
        if( req.files && Object.keys(req.files).length === 1 && req.files.file ){
    
            /* const { photo } = req.files;
    
            //validar extension del archivo
            const fileName = photo.name.split('.');
            const fileExtension = fileName[ fileName.length - 1 ];
            const validExtension = ['jpg', 'png', 'jpeg', 'gif'];
    
            if( !validExtension.includes( fileExtension ) ){
                return res.status(400).json({
                    status: false,
                    message: `La extension ${fileExtension} no es permitida., (${validExtension})`,
                });
            }
    
            //renombrar la imagen con uuid
            const tempFileName = uuidv4() + '.' + fileExtension;
    
            //uploadPath = path.join( __dirname, '../uploads/', photo.name );
            uploadPath = path.join( __dirname, '../uploads/', tempFileName );
    
            photo.mv(uploadPath, (err) => {
                if( err ){
                    return res.status(500).json({
                        status: false,
                        message: `Error al guardar foto de perfil.`,
                    });
                }
            }); */
            uploadPath = await uploadFile( req.files, undefined, 'users' );
        }
    
        const user = new User({
            firstname,
            lastname,
            email,
            phone,
            password,
            photo: uploadPath,
            address,
            birthday,
            isAdmin
        });
    
        //encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
        user.save();
    
        res.json({
            status: true,
            message: `Usuario ${firstname} ${lastname} registrado correctamente.`,
            result: user
        })
    }catch( error ){
        console.log( error );
        return res.status( 400 ).json({
            status: false,
            message: error
        });
    }

}

const update = async( req = request, res = response ) => {
    try{

        const uid = req.params.uid;
        const { _id, password, ...resto } = req.body;
    
        if( password ) {
            const salt = bcrypt.genSaltSync();
            resto.password = bcrypt.hashSync( password, salt );
        }
    
        //validar si el correo update esta registrado
        const userByEmail = await User.findOne({ email: resto.email, _id: { $ne: uid } });
        if( userByEmail ){
            return res.json({message: `El email ${resto.email} ya se encuentra registrado.`});
        }
    
        let uploadPath = '';
        if( req.files && Object.keys(req.files).length === 1 && req.files.file ){
            uploadPath = await uploadFile( req.files, undefined, 'users' );
    
            //validar si tiene una img existente y eliminarla
            const user = await User.findById( uid );
            if( user.photo ){
                destroyFile( user.photo );
            }
    
            resto.photo = uploadPath;
        }
    
        const result = await User.findByIdAndUpdate( uid, resto );
    
        res.json({
            status: true,
            result,
            message: `Usuario ${resto.firstname} ${resto.lastname} actualizado correctamente.`,
        })
    }catch (error) {
        console.log( error );
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const destroy = async( req = request, res = response ) => {
    try{
        const uid = req.params.uid;
    
        //TODO: Validar que el usuario no sea un doctor, tenga reservas registradas, solo se puede eliminar si no esta asociado a otro documento
    
        const doctor = await Doctor.findOne({ user: uid });
        if( doctor ){
            return res.json({
                status: false,
                message: 'No se puede eliminar el usuario porque se encuentra asociado a un doctor'
            });
        }
    
        const appointment = await Appointment.findOne({ patient: uid });
        if( appointment ){
            return res.json({
                status: false,
                message: 'No se puede eliminar el usuario porque tiene registros médicos.'
            });
        }
    
        const user = await User.findByIdAndDelete( uid );
        if( user.photo ){
            destroyFile( user.photo, 'users' );
        }
    
        res.json({
            status: true,
            result: user,
            message: `Usuario ${user.firstname} ${user.lastname} eliminado correctamente.`,
        });
    }catch (error) {
        console.log( error );
        return res.status(404).json({
            status: false,
            message: 'Error interno en el servidor, por favor vuelva a intentarlo.'
        })
    }
}

const changePassword = async ( req = request, res = response ) => {
    try{
        const uid = req.params.uid;
        let { password } = req.body;

        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync( password, salt );
      
        const user = await User.findByIdAndUpdate( uid, { password } );
    
        res.json({
            status: true,
            result: user,
            message: `Cambio de contraseña al usuario ${user.firstname} ${user.lastname} realizada correctamente.`,
        });
    }catch (error) {
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
    destroy,
    search,
    changePassword
}