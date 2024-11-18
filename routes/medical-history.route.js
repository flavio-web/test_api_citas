const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicalHistoryByUser } = require('../controllers/medical-history.controller');
const { existeUsuarioByUid } = require('../helpers');

const router = Router();

router.get('/:uid', [
    validarJWT,
    check('uid').custom( existeUsuarioByUid ),
    check('dateStart').optional().isDate({format: 'YYYY/MM/DD'}).withMessage("Fecha de comienzo incorrecta (YYYY/MM/DD)."),
    check('dateStart').optional().isDate({format: 'YYYY/MM/DD'}).withMessage("Fecha final incorrecta (YYYY/MM/DD)."),
    validarCampos
], getMedicalHistoryByUser );

router.get('/appointments/:uid', [
    validarJWT,
    check('uid').custom( existeUsuarioByUid ),
    check('dateStart').optional().isDate({format: 'YYYY/MM/DD'}).withMessage("Fecha de comienzo incorrecta (YYYY/MM/DD)."),
    check('dateStart').optional().isDate({format: 'YYYY/MM/DD'}).withMessage("Fecha final incorrecta (YYYY/MM/DD)."),
    validarCampos
], getMedicalHistoryByUser );

module.exports = router;