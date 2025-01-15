const express = require('express'); // Importa Express para crear el servidor.
const fs = require('fs'); // Módulo para trabajar con archivos.
const ExcelJS = require('exceljs'); // Librería para manipular archivos Excel.

const app = express(); // Crea una aplicación de Express.
app.use(express.json()); // Middleware para parsear JSON.

const filePath = 'data.xlsx'; // Nombre del archivo Excel donde guardaremos los datos.

// Ruta para manejar los datos enviados desde el formulario.
app.post('/save-to-excel', async (req, res) => {
    const { nombre, telefono, email, localidad, tipoPropiedad, comentarios } = req.body;

    // Crea un nuevo libro de Excel o abre uno existente.
    const workbook = new ExcelJS.Workbook();
    if (fs.existsSync(filePath)) {
        // Si el archivo ya existe, lo leemos.
        await workbook.xlsx.readFile(filePath);
    } else {
        // Si no existe, creamos un nuevo archivo con una hoja llamada "Datos".
        const sheet = workbook.addWorksheet('Datos');
        sheet.columns = [
            { header: 'Nombre', key: 'nombre' },
            { header: 'Teléfono', key: 'telefono' },
            { header: 'Email', key: 'email' },
            { header: 'Localidad', key: 'localidad' },
            { header: 'Tipo de Propiedad', key: 'tipoPropiedad' },
            { header: 'Comentarios', key: 'comentarios' },
        ];
    }

    // Agregamos una nueva fila con los datos recibidos.
    const sheet = workbook.getWorksheet('Datos');
    sheet.addRow({
        nombre,
        telefono,
        email,
        localidad,
        tipoPropiedad,
        comentarios,
    });

    // Guardamos el archivo Excel.
    await workbook.xlsx.writeFile(filePath);

    // Respondemos al cliente indicando que los datos fueron guardados.
    res.status(200).send('Datos guardados en Excel');
});

// Inicia el servidor en el puerto 3000.
app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
