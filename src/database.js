/* 
    Nombre: database
    Descripción: configuración y conexión de BD
    Autor: Lany Rojas
    Empresa: Invertir en bolsa

 */


const mysql = require('mysql');

// Se crea conexión con BD
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dev1234',
    database: 'ieb',
    port: 3306
 });

 // Conexión a la BD
 mysqlConnection.connect(function(errno){
    if (errno){
      console.log("err");
       console.log(errno);
       return;
    }else{
       console.log('Conexion a BD correcta');
    }
 });

 module.exports = mysqlConnection;