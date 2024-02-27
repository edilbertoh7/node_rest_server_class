const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = async(req = request, res = response) => {
  // sereciben los cquery params
  // const { q, nombre = 'sin nombre', apikey } = req.query
  const { limite = 5 , desde} = req.query
 
  const query = { estado: true };
  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  //   const total = await Usuario.countDocuments(query);
    /* para optimizar la respuesta ejecuto las dos 
    consultas en una promesa para que se ejecuten simultaneamente*/

    const [total, usuarios ]=await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
      
    ])


  res.json({
    total,
    usuarios
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

  res.json( existeusuario )
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