const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const router = Router();

router.get('/', usuariosGet);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es requerida').not().isEmpty(),
  check('password', 'La contraseña debe contener al menos 6 caracteres').isLength({ min: 6 }),
  //verifico que el correo sea valido
  check('correo', 'El correo es requerido').not().isEmpty(),
  check('correo', 'El correo no tiene un formato valido').isEmail(),
  check('correo').custom(emailExiste),
  //verifico que el rol exista en DB
  check('rol').custom(esRoleValido),
  //invoco el middleware personalizado para verificar todos los errores
  validarCampos
], usuariosPost);

router.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  // check('rol').custom(esRoleValido),
  validarCampos
], usuariosPut);

router.delete('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete);
//si la ruta no existe se muestra el mensaje de eror
router.put('*', (req, res) => {
  res.json({ message: 'la ruta no existe' })
});


module.exports = router