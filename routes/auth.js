
const {Router}=require('express');
const { check } = require('express-validator');
const { createUser, loginuser, renewUser } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-token');

const router = Router();

//crear usuario
router.post('/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatorio').isLength({min:6}),
    validarCampos
],createUser);

//login de usuario
router.post('/', [
    check('email','El email es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').isLength({min:6}),
    validarCampos
],loginuser);

//validar y revalidar token
router.get('/renew', validarJWT,renewUser);




module.exports = router;

