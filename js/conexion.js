let mysql = require("mysql");

let conexion = mysql.createConnection({
    host: "localhost", //host (localhost)
    database: "alberto_dacal_zn", //nombre de la base de datos
    user: "root",
    password: ""
});

// Conectar a la base de datos
conexion.connect(function(err){
    if (err){
        throw err;
    } else{
        console.log("Conexión exitosa");
    }
});

module.exports = conexion;
