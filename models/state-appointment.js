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
    primary: {
        type: String,
        default: '#8B5CF6',
        isLength: {
            options: { max: 7 },
            errorMessage: 'El color primario debe de tener 7 caracteres máximo',
        },
    },
    secondary: {
        type: String,
        default: '#31317C',
        isLength: {
            options: { max: 7 },
            errorMessage: 'El color secundario debe de tener 7 caracteres máximo',
        },
    }
}, {
    toJSON: { 
        virtuals: true,
        transform(doc, ret) {
            delete ret.__v
            ret.uid = ret._id
            delete ret.id
            delete ret._id
        }
    },
    toObject: { 
        virtuals: true,
        transform(doc, ret) {
            delete ret.__v
            ret.uid = ret._id
            delete ret.id
            delete ret._id
        }
    }
});


module.exports = model('states', StateAppointmentSchema);