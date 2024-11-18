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
});

DoctorSchema.methods.toJSON = function(){
    const { __v, _id, ...doctor } = this.toObject();
    doctor.uid = _id;
    return doctor;
}

module.exports = model('doctors', DoctorSchema);