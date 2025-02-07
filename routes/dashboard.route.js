const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { index } = require('../controllers/dashboard.controller');


const router = Router();


router.get('/', [
   validarJWT,
   validarCampos
], index );

module.exports = router;