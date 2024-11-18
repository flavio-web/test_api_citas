const jwt = require('jsonwebtoken');
const Usuario = require('../models/user');

const validarJWT = async ( req, res, next ) =>{

    const token = req.header('x-token');

    if( !token ){
        return res.status( 401 ).json({
            status: false,
            message: 'Debe enviar el token'
        });
    }

    try {

        const KEY = process.env.SECRET_KEY;
        const { uid } = jwt.verify( token, KEY );

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );
        if( !usuario ){
            return res.status( 401 ).json({
                status: false,
                message: 'Token no válido - usuario no existe en BD'
            });
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            status: false,
            message: 'Token no válido'
        });
    }

}

module.exports = {
    validarJWT
}