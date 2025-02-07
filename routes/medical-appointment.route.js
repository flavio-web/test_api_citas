const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { index, show, store, update, updateState, sendNotificationAppointment, destroy } = require('../controllers/appointment.controller');
const { existeSpecialityByUid, existeAppointmentByUid, existeStateAppointmentByUid, existeUsuarioByUid, existeDoctorByUid, existeServiceByUid } = require('../helpers');

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

/**esto no hacer */
router.get('/notification/:uid', [
    validarJWT,
    check('uid', 'No es un UID válido').isMongoId(),
    validarCampos
], sendNotificationAppointment );

router.post('/', [
    validarJWT,
    /* check('date').isDate({format: 'DD-MM-YYYY'})
            .withMessage("Invalid day received"), */
    check('datestart').isISO8601().toDate().withMessage("Fecha inicial incorrecta."),
    check('dateend').isISO8601().toDate().withMessage("Fecha final incorrecta."),
    check('state').custom( existeStateAppointmentByUid ),
    check('patient').custom( existeUsuarioByUid ),
    check('doctor').custom( existeDoctorByUid ),
    check('observation', 'La observación debe de tener 1000 caracteres máximo.').isLength({ min: 0, max: 1000 }),
    check('details').isArray({ min: 1 }),
    check('details.*.service', 'El servicio es obligatorio').custom( existeServiceByUid ),
    check('details.*.price', 'El precio es obligatorio y debe un número mayor a cero').isFloat({ min: 0 }),
    check('details.*.discount', 'El descuento es obligatorio y debe un número mayor a cero').isFloat({ min: 0 }),
    check('details.*.unit', 'La cantidad es obligatoria').isFloat({ min: 1 }),
    check('details.*.total', 'El total es obligatorio').isFloat({ min: 1 }),
    check('details.*.detail', 'El detalle debe de tener 500 caracteres máximo.').isLength({ min: 0, max: 500 }),
    validarCampos
], store );

router.put('/:uid', [
    validarJWT,
    check('uid').custom( existeAppointmentByUid ),
    check('datestart').isISO8601().toDate().withMessage("Fecha inicial incorrecta."),
    check('dateend').isISO8601().toDate().withMessage("Fecha final incorrecta."),
    check('state').custom( existeStateAppointmentByUid ),
    check('patient').custom( existeUsuarioByUid ),
    check('doctor').custom( existeDoctorByUid ),
    check('observation', 'La observación debe de tener 1000 caracteres máximo.').isLength({ min: 0, max: 1000 }),
    check('details').isArray({ min: 1 }),
    check('details.*.service', 'El servicio es obligatorio').custom( existeServiceByUid ),
    check('details.*.price', 'El precio es obligatorio y debe un número mayor a cero').isFloat({ min: 0 }),
    check('details.*.discount', 'El descuento es obligatorio y debe un número mayor a cero').isFloat({ min: 0 }),
    check('details.*.unit', 'La cantidad es obligatoria').isFloat({ min: 1 }),
    check('details.*.total', 'El total es obligatorio').isFloat({ min: 1 }),
    check('details.*.detail', 'El detalle debe de tener 500 caracteres máximo.').isLength({ min: 0, max: 500 }),
    validarCampos
], update );

router.put('/state/:uid', [
    validarJWT,
    check('uid').custom( existeAppointmentByUid ),
    check('state').custom( existeStateAppointmentByUid ),
    validarCampos
], updateState );

router.delete('/:uid', [
    validarJWT,
    check('uid').custom( existeAppointmentByUid ),
    validarCampos
], destroy );


module.exports = router;