const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {

    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        const [err] = errors.array();
        return res.status(400).json({ status: false, ...errors, message: err.msg });
    }

    next();
}

module.exports = {
    validarCampos
}