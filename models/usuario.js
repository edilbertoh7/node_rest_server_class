const { Schema, model } = require('mongoose');

//defino el modelo de usuario
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

// aca si se desea se pueden modificar los metodos existentes de mongoose o crear nuevos

/* quito la version y la contraseña para no enviarla en la respuesta al cliente 
y con el operador rest ...nombrevariable unifico el resto de los campos que quiero conserver*/
UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();

    return usuario;
}

//exporto el modelo y defino el nombre con el que se guardara en la base de datos
module.exports = model('Usuarios', UsuarioSchema)