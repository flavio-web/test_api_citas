const { Schema, model } = require('mongoose');
const DetailSchema = Schema({
    service: {
        type: Schema.Types.ObjectId,
        ref: 'services',
        required: true
    },
    unit: {
        type: Number,
        default: 1,
        min: 1
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
    total: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    detail:{
        type: String,
        isLength: {
            options: { max: 500 },
            errorMessage: 'El detalle debe de tener 500 caracteres máximo',
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


const AppointmentSchema = Schema({
    datestart:{
        type: Date,
        date: Date,
        default: Date.now(),
        required: true,
    },
    dateend:{
        type: Date,
        date: Date,
        default: Date.now(),
        required: true,
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'states',
        required: true
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'doctors',
        required: true
    },
    observation: {
        type: String,
        isLength: {
            options: { max: 1000 },
            errorMessage: 'La observación debe de tener 500 caracteres máximo',
        },
    },
    details: {
        type: [ DetailSchema ],
        require: true
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

AppointmentSchema.set('timestamps', true);

module.exports = model('appointments', AppointmentSchema);