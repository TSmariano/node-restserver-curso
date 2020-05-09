const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriaScheema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'Descriopcion es necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model( 'Categoria', categoriaScheema );
