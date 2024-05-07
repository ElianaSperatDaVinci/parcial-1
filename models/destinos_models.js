import mongoose from "mongoose";

const destinoSchema = new mongoose.Schema({
    ubicacion: {
        type: String,
        required: true
    },
    hospedajeNombre:{
        type: String,
        required: true
    },
    hospedajePrecioTotal: {
        type: Number,
        required: true
    },
    hospedajeEstadoDePago: {
        type: Boolean,
        required: true,
        default: false
    },
    hospedajeDesde: {
        type: Date,
        required: true
    },
    hospedajeHasta: {
        type: Date,
        required: true
    }
});

export default mongoose.model('Destino', destinoSchema);
