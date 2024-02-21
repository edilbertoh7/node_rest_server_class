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
 
  //hago destructuracion del body para extraer el nombre y la edad
  // console.log(req.body);

  const { nombre, correo, password, rol } = req.body

  const usuario = new Usuario({ nombre, correo, password, rol });
  // verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: 'El correo ya existe'
    })
  }

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

const usuariosPut = (req, res = response) => {

  const { id } = req.params


  res.json({
    message: 'put api - controller jajaj ',
    id
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