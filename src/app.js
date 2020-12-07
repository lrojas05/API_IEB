
/* 
    Nombre: api_ieb
    Descripción: Métodos para cliente y supermercado
    Autor: Lany Rojas
    Empresa: Invertir en bolsa

 */

const express = require ('express');
const app = express();
const routes = require('./routes/routes')

// Settings
app.set ('port', process.env.PORT || 3001);

//Middlewares
app.use(express.json());

//Routes
app.use(routes);

//Starting the server
app.listen (app.get('port'), () => {

    console.log("El servidor está inicializado en el puerto " + app.get('port'));
});


