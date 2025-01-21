const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const conexion = require("./conexion");  // Importa la conexión desde `conexion.js`

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para procesar datos JSON

// Ruta para recibir datos del formulario
app.post("/guardar", (req, res) => {
    const { nombre, telefono, email, localidad, tipoPropiedad, comentarios } = req.body;

    // Consulta SQL para insertar los datos
    const sql = `INSERT INTO solicitudes (nombre, telefono, email, localidad, tipoPropiedad, comentarios) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const valores = [nombre, telefono, email, localidad, tipoPropiedad, comentarios];

    conexion.query(sql, valores, (err, result) => {
        if (err) {
            console.error("Error al insertar los datos:", err);
            res.status(500).send("Error al guardar los datos.");
            return;
        }
        res.send("Datos guardados exitosamente.");
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
