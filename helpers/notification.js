

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
                <style>
                    :root {
                        --color-primary: #8B5CF6;
                        --color-primary-rgb: 0, 102, 0;
                        --color-primary-contrast: #ffffff;
                        --color-primary-contrast-rgb: 139, 92, 246;
                        --color-primary-shade: #744fcd;
                        --color-primary-tint: #623eb6;
                    
                        --color-secondary: #31317C;
                        --color-secondary-rgb: 0, 102, 0;
                        --color-secondary-contrast: #ffffff;
                        --color-secondary-contrast-rgb: 139, 92, 246;
                        --color-secondary-shade: #272762;
                        --color-secondary-tint: #202053;
                    
                    }

                    .container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
                        --bs-gutter-x: 1.5rem;
                        --bs-gutter-y: 0;
                        width: 100%;
                        padding-right: calc(1.5rem * .5);
                        padding-left: calc(1.5rem * .5);
                        margin-right: auto;
                        margin-left: auto;
                    }

                    .py-4 {
                        padding-top: 1.5rem !important;
                        padding-bottom: 1.5rem !important;
                    }

                    .row {
                        --bs-gutter-x: 1.5rem;
                        --bs-gutter-y: 0;
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: calc(-1* 0);
                        margin-right: calc(-.5* 1.5rem);
                        margin-left: calc(-.5* 1.5rem);
                    }

                    .mt-3 {
                        margin-top: 1rem !important;
                    }
                    .col-12 {
                        flex: 0 0 auto;
                        width: 100%;
                    }

                    h1 {
                        font-size: calc(1.375rem + 1.5vw);
                    }
                    .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
                        margin-top: 0;
                        margin-bottom: .5rem;
                        font-weight: 500;
                        line-height: 1.2;
                        color: inherit;
                    }

                    .fw-light {
                        font-weight: 300 !important;
                    }
                    .fs-4 {
                        font-size: calc(1.275rem + .3vw) !important;
                    }
                    p {
                        margin-top: 0;
                        margin-bottom: 1rem;
                    }

                    h2 {
                        font-size: calc(1.325rem + .9vw);
                    }
                    
                    .rounded {
                        border-radius: 0.375rem !important;
                    }
                    .text-center {
                        text-align: center !important;
                    }
                    .p-3 {
                        padding: 1rem !important;
                    }
                    .border {
                        border: 1px solid #dee2e6 !important;
                    }

                    .img-fluid {
                        max-width: 100%;
                        height: auto;
                    }

                    img, svg {
                        vertical-align: middle;
                    }

                    .m-2 {
                        margin: .5rem !important;
                    }

                    h5 {
                        font-size: 1.25rem;
                    }
                    
                    .text-white {
                        color: rgba(255, 255, 255, 1) !important;
                    }

                    .p-4 {
                        padding: 1.5rem !important;
                    }

                    .py-3 {
                        padding-top: 1rem !important;
                        padding-bottom: 1rem !important;
                    }

                    .fs-1 {
                        font-size: calc(1.375rem + 1.5vw) !important;
                    }

                    .justify-content-center {
                        justify-content: center !important;
                    }

                    .d-flex {
                        display: flex !important;
                    }

                    .h6, h6 {
                        font-size: 1rem;
                    }

                    .mx-4 {
                        margin-right: 1.5rem !important;
                        margin-left: 1.5rem !important;
                    }

                    .ms-2 {
                        margin-left: .5rem !important;
                    }

                    .cabecera{
                        background-color: #31317C;
                        width: 100%;
                        text-align: center;
                        color: #ffffff;
                    }

                    .titulo-principal{
                        color: #8B5CF6;
                    }

                    .titulo-secundario{
                        color: #31317C;
                    }

                    .icon-calendar{
                        width: 100px;
                    }

                    .imgDoctor{
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        border: 2px solid #8B5CF6;
                    }

                    .text-especialidad{
                        color: #8B5CF6;
                    }

                    .borde-contactos{
                        border-left: 1px solid #ffffff !important;
                    }

                    .borde-cita{
                        border-color: #8B5CF6 !important;
                    }

                    .fecha-cita{
                        color: #31317C !important;
                    }

                    .medico{
                        justify-content: center;
                    }

                    .cita{
                        width: 50%
                    }

                    @media (max-width: 470px) {
                        .cita{
                            width: 100%
                        }
                    }
                </style>
            </head>
            <body>
                
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 text-center cabecera" >
                            <picture>
                                <img src="https://raw.githubusercontent.com/flavio-web/test_api_citas/refs/heads/main/public/logo.png" class="img-fluid">
                            </picture>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="row py-4">
                        <table>
                            <tr>
                                <td>
                                    <div class="col-12 mt-3" style="width: 100%">
                                        <h1 class="titulo-principal">Hola <b>Flavio Román,</b></h1>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="col-12" style="text-align: justify; width: 100%">
                                        <p class="fs-4 fw-light" style="width: 98%">
                                            Mediante la presente queremos notificarte que tenemos una cita médica agendada con <b>Happy Medic App</b>, esperamos que la información que te proporcionamos sea de vital ayuda para mejorar la expericencia de tu visita y para ello necesitamos que llegues <b>15 minutos antes</b> de la hora establecida.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="col-12 mt-3" style="width: 100%">
                                        <h2 class="titulo-secundario"><b>Fecha y hora agenda para la cita médica:</b></h2>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="col-12 col-md-4 border borde-cita p-3 text-center rounded cita">
                                        <picture>
                                            <img src="https://raw.githubusercontent.com/flavio-web/test_api_citas/refs/heads/main/public/calendar.png" class="img-fluid icon-calendar">
                                        </picture>
                                        <div class="m-2">
                                            <h2 class="fecha-cita fs-2">2024/11/10 09:00</h2>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>

                <div class="container-fluid">
                    <div class="row cabecera text-white">
                        <table style="width: 100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="col-12 text-center py-3" style="width: 100%">
                                            <p class="text-white fs-1 fw-light">Usted será atentido por:</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="col-12 medico justify-content-center" style="width: 100%; style="display:flex; flex-wrap:wrap;"">
                                            <div class="text-center">
                                                <img src="https://i.pinimg.com/736x/1b/0a/41/1b0a41cf2132a34bf05a9b4dee30c1a6.jpg" class="imgDoctor">
                                                <h2><b>Dr. Maximiliano Rodriguez</b></h2>
                                                <h4 class="text-especialidad fs-4">- Cardilogo -</h4>
                                            </div>
                                            <div class="mx-4">
                                                <div class="ms-2">
                                                    <div>
                                                        <img src="https://raw.githubusercontent.com/flavio-web/test_api_citas/refs/heads/main/public/telefono.png" class="rounded" style="width: 25px">
                                                    </div>
                                                    <div class="ms-3">
                                                        <p class="fs-4" ><a href="tel:09874541231" target="_blank" style="color:#ffffff;text-decoration:none">09874541231</a></p>
                                                    </div>
                                                </div>
                                                <div class="ms-2">
                                                    <div>
                                                        <img src="https://raw.githubusercontent.com/flavio-web/test_api_citas/refs/heads/main/public/email.png" class="rounded" style="width: 25px">
                                                    </div>
                                                    <div class="ms-3">
                                                        <p class="fs-4" ><a href="mailto:correo@gmail.com" target="_blank" style="color:#ffffff;text-decoration:none">correo@gmail.com</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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