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
});


const AppointmentSchema = Schema({
    createdAt: {
        type: Date,
        date: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        date: Date,
        default: Date.now()
    },
    date:{
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


AppointmentSchema.methods.toJSON = function(){
    const { __v, _id, ...appointment } = this.toObject();
    appointment.uid = _id;
    return appointment;
}

module.exports = model('appointments', AppointmentSchema);