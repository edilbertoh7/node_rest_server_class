const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const router = Router();

router.get('/', usuariosGet);

router.post('/',[
  //verifico que el correo sea valido
  check('correo', 'El correo no tiene un formato valido').isEmail(),
], usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);
//si la ruta no existe se muestra el mensaje de eror
router.put('*', (req, res) => {
  res.json({ message: 'la ruta no existe' })
});


module.exports = router