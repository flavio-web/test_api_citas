const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { index, show, store, update, destroy } = require('../controllers/speciality.controller');
const { existeSpecialityByUid } = require('../helpers');

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
    check('state').isBoolean(),
    check('description', 'La descripción debe tener 200 caracteres máximo.').optional().isLength({ max: 200 }),
    validarCampos
], store );

router.put('/:uid', [
    validarJWT,
    check('uid').custom( existeSpecialityByUid ),
    check('name', 'El nombre es obligatorio y debe de tener 5 caracteres mínimo.').not().isEmpty().isLength({ min: 5, max: 50 }),
    check('state').isBoolean(),
    check('description', 'La descripción debe tener 200 caracteres máximo.').optional().isLength({ max: 200 }),
    validarCampos
], update );

router.delete('/:uid', [
    validarJWT,
    check('uid').custom( existeSpecialityByUid ),
    validarCampos
], destroy );


module.exports = router;