const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { index, show, store, update, destroy } = require('../controllers/doctor.controller');
const { existeDoctorByUid, existeUsuarioByUid, existeSpecialityByUid, codeDoctorExiste } = require('../helpers');

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
    check('code', 'El código es obligatorio').not().isEmpty().custom( codeDoctorExiste ),
    check('state').isBoolean(),
    check('user').custom( existeUsuarioByUid ),
    check('speciality').custom( existeSpecialityByUid ),
    validarCampos
], store );

router.put('/:uid', [
    validarJWT,
    check('uid').custom( existeDoctorByUid ),
    check('code', 'El código es obligatorio').not().isEmpty(),
    check('state').isBoolean(),
    check('user').custom( existeUsuarioByUid ),
    check('speciality').custom( existeSpecialityByUid ),
    validarCampos
], update );

router.delete('/:uid', [
    validarJWT,
    check('uid').custom( existeDoctorByUid ),
    validarCampos
], destroy );


module.exports = router;