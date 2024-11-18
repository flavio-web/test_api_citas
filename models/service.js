const { Schema, model } = require('mongoose');

const ServiceSchema = Schema({
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        isLength: {
            options: { min: 5, max: 50 },
            errorMessage: 'El nombre debe de tener 5 caracteres mínimo y 50 caracteres máximo',
        },
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    discount: {
        type: Number,
        default: 0,
        min: 0
    },
    state: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        isLength: {
            options: { max: 200 },
            errorMessage: 'La descripción debe de tener 200 caracteres máximo',
        }
    },
    speciality: {
        type: Schema.Types.ObjectId,
        ref: 'specialities',
        required: true
    },
}, {timestamps:true});

ServiceSchema.methods.toJSON = function(){
    const { __v, _id, ...service } = this.toObject();
    service.uid = _id;
    return service;
}

module.exports = model('services', ServiceSchema);