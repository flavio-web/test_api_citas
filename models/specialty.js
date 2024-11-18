const { Schema, model } = require('mongoose');

const SpecialtySchema = Schema({
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        isLength: {
            options: { min: 5, max: 50 },
            errorMessage: 'El nombre debe de tener 5 caracteres mínimo y 50 caracteres máximo',
        },
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
        },
    },
});

SpecialtySchema.methods.toJSON = function(){
    const { __v, _id, ...specialty } = this.toObject();
    specialty.uid = _id;
    return specialty;
}

module.exports = model('specialities', SpecialtySchema);