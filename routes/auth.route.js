const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login, validarToken } = require('../controllers/auth.controller');


const router = Router();


router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validarCampos
], login );

router.get('/validated-token', [], validarToken);


module.exports = router;