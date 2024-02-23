const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = (req = request, res = response) => {
  // sereciben los cquery params
  const { q, nombre = 'sin nombre', apikey } = req.query
  res.json({
    message: 'get api - controller jajaj ',
    q,
    nombre,
    apikey
  })
}

const usuariosPost = async (req, res = response) => {

  const { nombre, correo, password, rol } = req.body
  const usuario = new Usuario({ nombre, correo, password, rol });

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  console.log('usuario', usuario);
  //guardar en base de datos
  await usuario.save();
  res.json({
    usuario
  })
}

const usuariosPut = async (req, res = response) => {

  const { id } = req.params;
  const { password, google, ...resto } = req.body;

  //TODO validar contra base de datos
  if (password) {
    //encripto la contraseña y la paso al resto de los campos
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  // hago la actualizacion del usuario por su id
  const usuario1 = await Usuario.findByIdAndUpdate(id, resto);
  const existeusuario = await Usuario.findById(id);

  res.json({
    message: 'put api - controller jajaj ',
    existeusuario
  })
}

const usuariosDelete = (req, res = response) => {
  res.json({ message: 'delete api - controller jajaj ' })
}


module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
}