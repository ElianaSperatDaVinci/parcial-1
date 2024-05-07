import Usuario from "../models/usuarios_models.js"
import bcrypt from 'bcrypt';

async function obtenerUsuarios() {
    let usuarios = await Usuario.find()
    return usuarios;
}

async function crearUsuarios(body){
    let usuario = new Usuario ({
        nombre: body.nombre,
        apellido: body.apellido,
        nacimiento: body.nacimiento,
        dni: body.dni,
        mail: body.mail,
        cbu: body.cbu,
        banco: body.banco,
        direccion: body.direccion,
        localidad: body.localidad,
        imagen: body.imagen,
        contrasena: bcrypt.hashSync(body.contrasena, 10)
    })
    return await usuario.save();
}

async function actualizarUsuario(id, body){
    let usuario = await Usuario.findByIdAndUpdate( id, {
        $set: {
            nombre: body.nombre,
            contrasena: body.contrasena
        }
    });
    
    return usuario;
}

async function buscarPorNombre(nombre) {
    const usuarios = await Usuario.find({ nombre: { $regex: nombre, $options: 'i' } }).sort({ nombre: 1 });
    return usuarios;
}

async function usuariosOrdenadosPorNombre() {
    const usuarios = await Usuario.find().sort({ nombre: 1 });
    return usuarios;
}

export {
    obtenerUsuarios,
    crearUsuarios,
    actualizarUsuario,
    buscarPorNombre,
    usuariosOrdenadosPorNombre
}