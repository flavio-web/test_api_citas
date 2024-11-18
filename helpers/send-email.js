const { transporter } = require("../config/email.config");


const sendMailDefault = async ( from = '"Notificación Cita Medica 👻" <sodinfofacturacion@gmail.com>', to = 'flavioromanweb@gmail.com, flaroval_2@hotmail.com', subject = 'Hello ✔', html = '', text = '' ) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });
  
    console.log(info);
    return info;
    //console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = {
    sendMailDefault
}