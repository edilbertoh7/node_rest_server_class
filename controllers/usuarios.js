const { response } = require('express')

const usuariosGet = (req = request, res = response) => {
  // sereciben los cquery params
  const {q,nombre = 'sin nombre',apikey} = req.query
    res.json({
      message:'get api - controller jajaj ',
    q,
    nombre,
    apikey
  })
  }

  const usuariosPut = (req, res = response) => {

    const  {id} = req.params


    res.json({
      message:'put api - controller jajaj ',
    id
  })
  }

  const usuariosPost = (req, res = response) => {
    //hago destructuracion del body para extraer el nombre y la edad
    console.log(req.body);
    
    const { nombre, edad,id } = req.body
    res.json({
        message:'post api - controller jajaj ',
        nombre,
        edad,
        id
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