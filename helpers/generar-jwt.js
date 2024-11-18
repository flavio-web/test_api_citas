const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {
    return new Promise((resolve, reject ) => {
        const payload = { uid };
        const KEY = process.env.SECRET_KEY;

        jwt.sign( payload, KEY, {
           //expiresIn: '24h'
        }, ( error, token ) => {
            if( error ){
                console.log( error );
                reject('No se pudo generar el token.');
            }else{
                resolve( token );
            }
        });
    });
}

module.exports = {
    generarJWT
}