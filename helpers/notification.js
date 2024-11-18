

const crearHtmlNotificacion = () => {

    const url = process.env.URL+':'+process.env.PORT;
    console.log( url );
    const notification = `
        <!doctype html>
            <html lang="es">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Template Notificacion</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <link rel="stylesheet" href="${url}/style.css">
            </head>
            <body>
                
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 text-center cabecera">
                            <picture>
                                <img src="http://localhost:8080/logo.png" class="img-fluid">
                            </picture>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="row py-4">
                        <div class="col-12 mt-3">
                            <h1 class="titulo-principal">Hola <b>Flavio Román,</b></h1>
                        </div>

                        <div class="col-12" style="text-align: justify;">
                            <p class="fs-4 fw-light">
                                Mediante la presente queremos notificarte que tenemos una cita médica agendada con <b>Happy Medic App</b>, esperamos que la información que te proporcionamos sea de vital ayuda para mejorar la expericencia de tu visita y para ello necesitamos que llegues <b>15 minutos antes</b> de la hora establecida.
                            </p>
                        </div>

                        <div class="col-12 mt-3">
                            <h2 class="titulo-secundario"><b>Fecha y hora agenda para la cita médica:</b></h2>
                        </div>

                        <div class="col-12 col-md-4 border borde-cita p-3 text-center rounded">
                            <picture>
                                <img src="${url}/calendar.png" class="img-fluid icon-calendar">
                            </picture>
                            <div class="m-2">
                                <h5 class="fecha-cita fs-2">2024/11/10 09:00</h5>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="container-fluid">
                    <div class="row cabecera text-white p-4">
                        <div class="col-12 text-center py-3">
                            <p class="text-white fs-1 fw-light">Usted será atentido por:</p>
                        </div>

                        <div class="col-12 d-flex justify-content-center">
                            <div class="text-center">
                                <img src="https://i.pinimg.com/736x/1b/0a/41/1b0a41cf2132a34bf05a9b4dee30c1a6.jpg" class="imgDoctor">
                                <h4><b>Dr. Maximiliano Rodriguez</b></h4>
                                <h6 class="text-especialidad">- Cardilogo -</h6>
                            </div>
                            <div class="mx-4 borde-contactos">
                                <div class="ms-2  d-flex justify-content-left">
                                    <div>
                                        <img src="telefono.png" class="rounded" style="width: 25px">
                                    </div>
                                    <div class="ms-3">
                                        <p>09874541231</p>
                                    </div>
                                </div>
                                <div class="ms-2  d-flex justify-content-left">
                                    <div>
                                        <img src="email.png" class="rounded" style="width: 25px">
                                    </div>
                                    <div class="ms-3">
                                        <p>correo@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </body>
            </html>
    `;

    return notification;
}

module.exports = {
    crearHtmlNotificacion
}