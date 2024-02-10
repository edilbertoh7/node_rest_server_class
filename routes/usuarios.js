const {Router} = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const router = Router();

router.get('/',  usuariosGet);

  router.put('/:id',  usuariosPut);

  router.post('/',  usuariosPost);

  router.delete('/',  usuariosDelete);
  //si la ruta no existe se muestra el mensaje de eror
  router.put('*',  (req, res)=>{
    res.json({message:'la ruta no existe'})
  });


  module.exports = router