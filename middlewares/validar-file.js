

const validarFile = ( req, res, next ) => {

    if( req.files || Object.keys(req.files).length === 0 || req.files.file ){
        return res.status(400).json({
            status: false,
            message: 'No hay archivos por subir'
        });
    }

    next();
}

module.exports = {
    validarFile
}