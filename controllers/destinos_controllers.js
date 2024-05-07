import Destino from "../models/destinos_models.js"

async function obtenerDestinos() {
    let destino = await Destino.find()
    return destino;
}

async function crearDestinos(body) {
    let destino = new Destino({
        ubicacion: body.ubicacion,
        hospedajeNombre: body.hospedajeNombre,
        hospedajePrecioTotal: body.hospedajePrecioTotal,
        hospedajeEstadoDePago: body.hospedajeEstadoDePago,
        hospedajeDesde: body.hospedajeDesde,
        hospedajeHasta: body.hospedajeHasta
    });
    await destino.save();

    return destino;
}

async function buscarPorId(id){
    const destino = await Destino.findById(id);
    if(!destino){
        return ('Destino no encontrado.')
    }
    
    return destino;
}

async function actuaizarDestino(id, body){
    let destino = await Destino.findByIdAndUpdate(id, {
        $set: {
            ubicacion: body.ubicacion
        }
    });

    return destino;
}

async function eliminarDestino(id){
    const destinoEliminado = await Destino.findByIdAndDelete(id);
    if (!destinoEliminado) {
        return ('Destino no encontrado.');
    }
    return destinoEliminado;
}

async function estadoDePago(estado) {
    const destinosFiltrados = await Destino.find({ hospedajeEstadoDePago: estado });
    return destinosFiltrados;
}

async function buscarPorUbicacion(ubicacion) {
    const destinos = await Destino.find({ ubicacion: { $regex: ubicacion, $options: 'i' } });
    // Comentario:
    // $regex lo usé para buscar destinos que en su ubicación contengan una parte del String que coincida con lo que tenemos guardado en la Base de Datos.
    // $options: 'i' es la sintaxis que provee MongoDB para que este tipo de búsqueda sea insensible al 'Case Senssitive', entonces no importa si el usuario busca "París", "parís" o "PaRíS", va a devolver los resultados correspondientes.
    // Lo que no logré hacer es una búsqueda exitosa ignorando los caracteres especiales. Si yo escribo en la URL localhost:3000/destinos/ubicacion/Paris (sin la tilde en la i), no va a funcionar.
    // Documentación: https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    return destinos;
}


export {
    obtenerDestinos,
    crearDestinos,
    buscarPorId,
    actuaizarDestino,
    eliminarDestino,
    estadoDePago,
    buscarPorUbicacion
}