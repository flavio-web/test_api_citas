const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { index, show, store, update, destroy } = require('../controllers/state-appointment.controller');
const { existeStateAppointmentByUid } = require('../helpers');

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
    check('description', 'La descripción debe tener 200 caracteres máximo.').optional().isLength({ max: 200 }),
    check('primary', 'El color primario es obligatorio y debe tener 7 caracteres máximo.').not().isEmpty().isLength({ max: 7 }),
    check('secondary', 'El color secundario es obligatorio y debe tener 7 caracteres máximo.').not().isEmpty().isLength({ max: 7 }),
    validarCampos
], store );

router.put('/:uid', [
    validarJWT,
    check('uid').custom( existeStateAppointmentByUid ),
    check('name', 'El nombre es obligatorio y debe de tener 5 caracteres mínimo.').not().isEmpty().isLength({ min: 5, max: 50 }),
    check('description', 'La descripción debe tener 200 caracteres máximo.').optional().isLength({ max: 200 }),
    validarCampos
], update );

router.delete('/:uid', [
    validarJWT,
    check('uid').custom( existeStateAppointmentByUid ),
    validarCampos
], destroy );


module.exports = router;