const { Router } = require('express');
const { check } = require('express-validator');
const { index, show, store, update, destroy, search, changePassword } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste, existeUsuarioByUid } = require('../helpers');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/* router.get('/', (req, res) =>{
    const parentDir = path.normalize(__dirname+"/..");
    res.sendFile(parentDir+'/public/index.html');
});
 */


router.get('/', [
    validarJWT,
    validarCampos
], index );

router.get('/search', [
    validarJWT,
    /* check('q', 'El dato de busqueda es obligatorio.').not().isEmpty(),
    check('limit', 'El limite por default es 10 y debe ser un numero mayor a cero').optional().isFloat({ min: 0 }), */
    validarCampos
], search );

router.get('/:uid',[
    validarJWT,
    check('uid', 'No es un UID válido').isMongoId(),
    validarCampos
], show );



router.post('/',[
    //validarJWT,
    check('email', 'El email es obligatorio.').isEmail(),
    check('firstname', 'El nombre es obligatorio y debe de tener 5 caracteres mínimo.').not().isEmpty().isLength({ min: 5, max: 50 }),
    check('lastname', 'El apellido debe tener 50 caracteres máximo.').optional().isLength({ max: 50 }),
    check('password', 'La contraseña es obligatoria y debe de tener más de 5 caracteres.').isLength({ min: 5, max: 30 }),
    check('email').isEmail().custom( emailExiste ),
    check('phone', 'El teléfono debe tener 15 caracteres máximo.').optional().isLength({ max: 15 }),
    check('address', 'La dirección debe tener 200 caracteres máximo.').optional().isLength({ max: 200 }),
    check('birthday', 'La fecha de nacimiento es incorrecta.').isDate({format: 'YYYY-MM-DD'}).optional(),
    validarCampos,
], store );

router.put('/change-password/:uid', [
    validarJWT,
    check('uid').custom( existeUsuarioByUid ),
    check('password', 'La contraseña es obligatoria y debe de tener más de 5 caracteres.').isLength({ min: 5, max: 30 }),
    validarCampos,
], changePassword);

router.put('/:uid', [
    validarJWT,
    check('uid').custom( existeUsuarioByUid ),
    check('firstname', 'El nombre es obligatorio y debe de tener 5 caracteres mínimo.').not().isEmpty().isLength({ min: 5, max: 50 }),
    check('lastname', 'El apellido debe tener 50 caracteres máximo.').optional().isLength({ max: 50 }),
    check('password', 'La contraseña es obligatoria y debe de tener más de 5 caracteres.').optional().isLength({ max: 30 }),
    check('email').isEmail(),
    check('phone', 'El teléfono debe tener 15 caracteres máximo.').optional().isLength({ max: 15 }),
    check('address', 'La dirección debe tener 200 caracteres máximo.').optional().isLength({ max: 200 }),
    check('birthday', 'La fecha de nacimiento es incorrecta.').isDate({format: 'YYYY-MM-DD'}).optional(),
    validarCampos,
], update);

router.delete('/:uid', [
    validarJWT,
    check('uid').custom( existeUsuarioByUid ),
    validarCampos
], destroy );

module.exports = router;
