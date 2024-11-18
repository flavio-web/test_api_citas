const { request, response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generarJWT } = require('../helpers');
const User = require('../models/user');

const login = async( req = request, res = response ) => {

    const { email, password } = req.body;

    try {

        const usuario = await User.findOne({ email });
        if( !usuario ){
            return res.status( 400 ).json({
                status: false,
                message: 'Usuario o contraseña incorrectos - email'
            });
        }
       

        //validar contraseña
        const validarPassword = bcrypt.compareSync( password, usuario.password );
        if( !validarPassword ){
            return res.status( 400 ).json({
                status: false,
                message: 'Usuario o contraseña incorrectos - password'
            });
        }

        //generar el JWT (token)
        const token = await generarJWT( usuario._id );

        res.json({
            status: true,
            result: usuario,
            token
        });

        
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            status: false,
            message: 'Oops! Algo salió mal.'
        });
    }

}

const validarToken = async( req = request, res = respose ) => {
    const token = req.header('x-token');
    console.log({ token });
    if( !token ){
        return res.status( 401 ).json({
            status: false,
            message: 'Debe enviar el token'
        });
    }

    try {

        const KEY = process.env.SECRET_KEY;
        const { uid } = jwt.verify( token, KEY );
        console.log({ uid });
        //leer el usuario que corresponde al uid
        const usuario = await User.findById( uid );
        if( !usuario ){
            res.status( 401 ).json({
                status: false,
                message: 'Token no válido - usuario no existe en BD'
            });
        }

        res.json({
            status: true,
            result: usuario,
            token,
            message: 'Token correcto'
        });

        
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            status: false,
            message: 'Token no válido'
        });
    }
}

module.exports = {
    login,
    validarToken
}