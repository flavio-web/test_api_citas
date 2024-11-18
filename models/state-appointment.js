const { Schema, model } = require('mongoose');

const StateAppointmentSchema = Schema({
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        isLength: {
            options: { min: 5, max: 50 },
            errorMessage: 'El nombre debe de tener 5 caracteres mínimo y 50 caracteres máximo',
        },
    },
    description: {
        type: String,
        isLength: {
            options: { max: 200 },
            errorMessage: 'La descripción debe de tener 200 caracteres máximo',
        },
    },
});

StateAppointmentSchema.methods.toJSON = function(){
    const { __v, _id, ...state } = this.toObject();
    state.uid = _id;
    return state;
}

module.exports = model('states', StateAppointmentSchema);