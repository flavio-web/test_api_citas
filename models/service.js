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
    duration: {
        type: Number,
        default: 30,
        min: 10
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

ServiceSchema.set('timestamps', true);

module.exports = model('services', ServiceSchema);