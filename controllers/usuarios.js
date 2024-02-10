const { response } = require('express')

const usuariosGet = (req, res = response) => {
    res.json({message:'get api - controller jajaj '})
  }

  const usuariosPut = (req, res = response) => {
    res.json({message:'put api - controller jajaj '})
  }

  const usuariosPost = (req, res = response) => {
    //hago destructuracion del body para extraer el nombre y la edad
    console.log(req.body);
    
    const { nombre, edad } = req.body
    res.json({
        message:'post api - controller jajaj ',
        nombre,
        edad
    })
  }

  const usuariosDelete = (req, res = response) => {
    res.json({message:'delete api - controller jajaj '})
  }


  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
  }