const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { coleccionesPermitidas } = require('../helpers');
const { loadFile } = require('../controllers/upload.controller');

const router = Router();

router.get('/:coleccion/:uid', [
    check('uid', 'No es un UID válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['users']) ),
    validarCampos
], loadFile );


module.exports = router;