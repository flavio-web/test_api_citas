const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    firstname: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        isLength: {
            options: { min: 5, max: 50 },
            errorMessage: 'El nombre debe de tener 5 caracteres mínimo y 50 caracteres máximo',
        },
    },
    lastname: {
        type: String,
        isLength: {
            options: { max: 50 },
            errorMessage: 'El apellido debe de tener 50 caracteres máximo',
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        isLength: {
            options: { max: 50 },
            errorMessage: 'El email debe de tener 50 caracteres máximo',
        }
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        isLength: {
            options: { max: 20 },
            errorMessage: 'La teléfono debe de tener 20 caracteres máximo',
        },
    },
    photo: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        isLength: {
            options: { max: 200 },
            errorMessage: 'La dirección debe de tener 200 caracteres máximo',
        },
    },
    birthday: {
        type: Date,
        date: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: { 
        virtuals: true,
        transform(doc, ret) {
            delete ret.__v
            ret.uid = ret._id
            delete ret.id
            delete ret.password
            delete ret._id
        }
     },
    toObject: { 
        virtuals: true,
        transform(doc, ret) {
            delete ret.__v
            ret.uid = ret._id
            delete ret.id
            delete ret.password
            delete ret._id
        }
    }
});

UserSchema.virtual('fullName').get(function() {
    return `${this.firstname} ${this.lastname}`;
});


module.exports = model('users', UserSchema);