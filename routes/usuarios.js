const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');
const router = Router();

router.get('/', usuariosGet);

router.post('/',[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es requerida').not().isEmpty(),
  check('password', 'La contraseña debe contener al menos 6 caracteres').isLength({min: 6}),
  //verifico que el correo sea valido
  check('correo', 'El correo no tiene un formato valido').isEmail(),
  // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  //verifico que el rol exista en DB
  check('rol').custom( async(rol ='')=>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
      throw new Error(`El rol ${rol} no se encuantra registrado en la base de datos`);
    }
  }),
  //invoco el middleware personalizado para verificar todos los errores
  validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);
//si la ruta no existe se muestra el mensaje de eror
router.put('*', (req, res) => {
  res.json({ message: 'la ruta no existe' })
});


module.exports = router