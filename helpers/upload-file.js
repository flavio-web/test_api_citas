
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const uploadFile = ( files, validExtension = ['jpg', 'png', 'jpeg', 'gif'], folder = '' ) => {
    return new Promise((resolve, reject) => {
        const { file } = files;

        //validar extension del archivo
        const fileName = file.name.split('.');
        const fileExtension = fileName[ fileName.length - 1 ];

        if( !validExtension.includes( fileExtension ) ){
            reject(`La extension ${fileExtension} no es permitida., (${validExtension})`);
        }

        //renombrar la imagen con uuid
        const tempFileName = uuidv4() + '.' + fileExtension;

        //uploadPath = path.join( __dirname, '../uploads/', file.name );
        uploadPath = path.join( __dirname, '../uploads/', folder, tempFileName );

        file.mv(uploadPath, (err) => {
            if( err ){
                reject(`Error al guardar foto de perfil.`)
            }
        });

        //No vamos a retotnar uploadPath porque nos da el path completo de nuestra computadora y no podremos acceder desde la web y deberiamos de add la carpera upload a los archivos estaticos. Por eso solo vamos a devolver el nombre del archivo
        resolve( tempFileName );
    });
}

const destroyFile = ( fileName = '', folder = '' ) => {
    return new Promise((resolve, reject) => {
        const pathImage = path.join( __dirname, '../uploads/', folder, fileName );

        if( fs.existsSync( pathImage ) ){
            fs.unlinkSync( pathImage );
        }else{
            console.log({msg: 'no existe img', pathImage})
        }

        resolve( pathImage );
    });
}

module.exports = {
    uploadFile,
    destroyFile
}