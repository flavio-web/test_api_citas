const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    speciality: {
        type: Schema.Types.ObjectId,
        ref: 'specialities',
        required: true
    },
    state: {
        type: Boolean,
        default: true
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

module.exports = model('doctors', DoctorSchema);