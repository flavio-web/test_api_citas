const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { index, show, store, update, destroy } = require('../controllers/service.controller');
const { existeSpecialityByUid, existeServiceByUid } = require('../helpers');

const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
], index );

router.get('/:uid', [
    validarJWT,
    check('uid', 'No es un UID válido').isMongoId(),
    validarCampos
], show );

router.post('/', [
    validarJWT,
    check('name', 'El nombre es obligatorio y debe de tener 5 caracteres mínimo.').not().isEmpty().isLength({ min: 5, max: 50 }),
    check('price', 'El precio es obligatorio y debe un número mayor a cero').isFloat({ min: 0 }),
    check('discount', 'El descuento es obligatorio y debe un número mayor a cero').isFloat({ min: 0 }),
    check('description', 'El descripción debe de tener 200 caracteres máximo.').isLength({ min: 0, max: 200 }),
    check('state').isBoolean(),
    check('speciality').custom( existeSpecialityByUid ),
    validarCampos
], store );

router.put('/:uid', [
    validarJWT,
    check('uid').custom( existeServiceByUid ),
    check('name', 'El nombre es obligatorio y debe de tener 5 caracteres mínimo.').not().isEmpty().isLength({ min: 5, max: 50 }),
    check('price', 'El precio es obligatorio y debe un número mayor a cero').not().isEmpty().isNumeric({ min: 0}),
    check('discount', 'El descuento es obligatorio y debe un número mayor a cero').not().isEmpty().isNumeric({ min: 0}),
    check('description', 'El descripción debe de tener 200 caracteres máximo.').isLength({ min: 0, max: 200 }),
    check('state').isBoolean(),
    check('speciality').custom( existeSpecialityByUid ),
    validarCampos
], update );

router.delete('/:uid', [
    validarJWT,
    check('uid').custom( existeServiceByUid ),
    validarCampos
], destroy );


module.exports = router;