import mongoose from "mongoose"

const usuariosSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nacimiento: {
        type: String,
        required: false
    },
    dni: {
        type: Number,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    cbu: {
        type: String,
        required: false
    },
    banco: {
        type: String,
        required: false
    },
    direccion: {
        type: String,
        required: true
    },
    localidad: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: false
    },
    contrasena: {
        type: String,
        required: true
    }
})

export default mongoose.model('Usuarios', usuariosSchema)