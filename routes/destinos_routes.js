import express from "express";
import { obtenerDestinos, crearDestinos, buscarPorId, actuaizarDestino, eliminarDestino, estadoDePago, buscarPorUbicacion } from "../controllers/destinos_controllers.js";
import Joi from "joi"
import verificarToken from "../middlewares/auth.js"

const ruta = express.Router();

const schema = Joi.object({
    ubicacion: Joi.string().min(3).max(50).required(),
    hospedajeNombre: Joi.string().min(3).max(50).required(),
    hospedajePrecioTotal: Joi.number().positive().required(),
    hospedajeEstadoDePago: Joi.boolean().required(),
    hospedajeDesde: Joi.date().iso().required(),
    hospedajeHasta: Joi.date().iso().min(Joi.ref('hospedajeDesde')).required()
});

ruta.get('/', verificarToken, (req, res) => {
  let resultado = obtenerDestinos();
  resultado.then(destinos => {
    res.json({destinos})
  })
  .catch(err => {
    res.status(400).json({err})
  })
});

ruta.post('/', (req, res) => {
  let body = req.body;

  const { error, value } = schema.validate({
      ubicacion: body.ubicacion,
      hospedajeNombre: body.hospedajeNombre,
      hospedajePrecioTotal: body.hospedajePrecioTotal,
      hospedajeEstadoDePago: body.hospedajeEstadoDePago,
      hospedajeDesde: body.hospedajeDesde,
      hospedajeHasta: body.hospedajeHasta
  });

  if (!error) {
      let resultado = crearDestinos(body);
      resultado
      .then(destino => {
          res.json({ destino });
      })
      .catch(err => {
          res.status(400).json({ err });
      });
  } else {
      res.status(400).json(error);
  }
});

ruta.get('/:id', (req, res) => {
  let id = req.params.id;

  buscarPorId(id)
    .then(destino => {
      res.json(destino);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

ruta.put('/:id', (req, res) => {
  let body = req.body;
  let resultado = actuaizarDestino(req.params.id, body)
  resultado
  .then(destino => {
    res.json(destino)
  })
  .catch(error => {
    res.status(400).json({error})
  })
})

ruta.delete('/:id', (req, res) => {
  const id = req.params.id;
  eliminarDestino(id)
      .then(destinoEliminado => {
          res.json(destinoEliminado);
      })
      .catch(error => {
          res.status(400).json({ error: error.message });
      });
});

// localhost:3000/destinos/estado/true
ruta.get('/estado/:estado', (req, res) => {
  let estado = req.params.estado;

  estadoDePago(estado)
    .then(destinos => {
      res.json(destinos);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// localhost:3000/destinos/ubicacion/París
ruta.get('/ubicacion/:lugar', (req, res) => {
  let lugar = req.params.lugar;

  buscarPorUbicacion(lugar)
      .then(destinos => {
          res.json(destinos);
      })
      .catch(error => {
          res.status(400).json({ error: error.message });
      });
});


export default ruta;
