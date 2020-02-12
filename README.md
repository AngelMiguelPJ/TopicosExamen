Examen Topicos Especiales 2019-B
Ionic-Dropbox
El aplicativo incluido en este respositorio tiene el uso de una api propia de Dropbox, para dicha api y sus funcionalidades.

El objetivo de este aplicativo movil hecho para android es el de acceder a todos los archivos de un usuario en Dropbox, ya sea mediante el inicio de sesión propio de Dropbox o google.

El desarrollo de la App se realizo en Visual Studio Code por su facilidad de uso y felixibilidad.

Los comandos de mas relevancia durante el desarrollo son instalar dependencias o plugin adicionales.

    1. Para uso en el navegador de aplicaciones.
        ionic cordova plugin add cordova-plugin-inappbrowser
        npm install @ionic-native/in-app-browser
        
    2. Para el soporte de navegadores, aunque en la ultima version de angular algunos metodos fueron emilinados o obsoletos.
        @angular/platform-browser
    
    3. Proporcionar servido de Http con el que se hara la peticion mediante Key o Token de Dropbox Developer
        npm install @angular/http
        
    4. Solo si es necesario, cuando fallen los scripts o algun otro tipo de problema parecido.
        npm install @ionic/app-scripts@latest --save-dev

    5. Para cargar dependencias usadas en el mapeo de los datos.
        npm install rxjs-compat
    
Para poner en marcha el aplicativo solo debemos seguir 2 pasos.
    1. Ejecutar el comando "npm install".
    2. Ejecutar ya sea "ionic serve" o "ionic serve -l" para vizualizar en tiempo real el aplicativo.

Para mayor informacion sobre el uso de la api de Dropbox podemos dirigirnos al siguiente enlace enlance:
https://www.dropbox.com/developers/documentation/http/documentation

