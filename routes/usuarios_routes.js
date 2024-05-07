import express from "express"
import { obtenerUsuarios, crearUsuarios, actualizarUsuario, buscarPorNombre, usuariosOrdenadosPorNombre } from "../controllers/usuarios_controllers.js";
import Joi from "joi"

const ruta = express.Router();

const schema = Joi.object({
    nombre: Joi.string().alphanum().min(3).max(15).required(),
    contrasena: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    mail: Joi.string().email({minDomainSegments: 2, tlds: {allow: ["com", "net", "org", "edu"]}}),
    apellido: Joi.string().alphanum().min(3).max(15).required(),
    //nacimiento: Joi.number().integer().min(1900).max(2024).required(),
    dni: Joi.number().integer().positive().required(),
    cbu: Joi.string().alphanum().min(3).max(30).required(),
    banco: Joi.string().alphanum().min(3).max(30).required(),
    direccion: Joi.string().min(3).max(50).required(),
    localidad: Joi.string().min(3).max(30).required(),
    imagen: Joi.string().min(3).max(100),
    contrasena: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

ruta.get('/', (req, res) => {
    let resultado = obtenerUsuarios()
    resultado
    .then(usuarios => {
        res.json({usuarios})
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.post('/', (req, res) => {
    let body = req.body;

    const {error, value} = schema.validate({
        nombre: body.nombre,
        apellido: body.apellido,
        //nacimiento: body.nacimiento,
        dni: body.dni,
        mail: body.mail,
        cbu: body.cbu,
        banco: body.banco,
        direccion: body.direccion,
        localidad: body.localidad,
        imagen: body.imagen,
        contrasena: body.contrasena
    })

    if(!error){
        let resultado = crearUsuarios(body)
        resultado
        .then(usuario => {
            res.json({usuario})
        })
        .catch(err => {
            res.status(400).json({ err: err.message })
        })
    }else{
        res.status(400).json(error)
    }
})

ruta.put('/:id', (req, res) => {
    let body = req.body;
    let resultado = actualizarUsuario(req.params.id, body)
    resultado
    .then(usuario => {
        res.json(usuario)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.get('/nombre/:nombre', (req, res) => {
    let nombre = req.params.nombre;
  
    buscarPorNombre(nombre)
      .then(usuarios => {
        res.json(usuarios);
      })
      .catch(error => {
        res.status(400).json({ error: error.message });
      });
});

ruta.get('/ordenados', (req, res) => {
    usuariosOrdenadosPorNombre()
      .then(usuarios => {
        res.json(usuarios);
      })
      .catch(error => {
        res.status(400).json({ error: error.message });
      });
  });

export default ruta;