const { request, response } = require('express');
const User = require('../models/user');
const path = require('path');
const fs = require('fs');


const loadFile = async( req = request, res = response ) => {

    const { uid, coleccion } = req.params;
    let modelo;

    switch( coleccion ) {
        case 'users':
            modelo = await User.findById( uid );
            if( !modelo ){
                return res.json(401).json({
                    status: false,
                    message: `No existe un usuario con el uid ${uid}.`
                });
            }

            break;

        default:
            return res.status(500).json({
                status: false,
                message: `La colección ${coleccion} aún no está disponible.`
            });
    }

    if( modelo.photo ){
        const pathImage = path.join( __dirname, '../uploads', coleccion, modelo.photo );

        if( fs.existsSync( pathImage ) ){
            const image = fs.readFileSync(pathImage, { encoding: 'base64' });
            return res.send(`data:image/jpeg;base64,${image}`);
            //return res.sendFile( pathImage );
        }
    }

    //retornar la imagen por defecto
    const pathImage = path.join( __dirname, '../uploads/no-image-user.png');
    const image = fs.readFileSync(pathImage, { encoding: 'base64' });
    //return res.sendFile( pathImage );
    return res.send(`data:image/jpeg;base64,${image}`);
}

module.exports = {
    loadFile
}