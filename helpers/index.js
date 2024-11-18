const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...uploadFile
}