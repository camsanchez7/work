document.getElementById('formulario').addEventListener('submit', async function (e) {
    e.preventDefault();

    // captura de datos
    const formData = new FormData(e.target); 
    const data = Object.fromEntries(formData.entries()); 

    console.log(data); // verificacion en consola

    // enviar de datos al servidor.
    try {
        const response = await fetch('/save-to-excel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Formulario enviado exitosamente.');
        } else {
            alert('Hubo un problema al enviar el formulario.');
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('No se pudo enviar el formulario. Inténtalo de nuevo más tarde.');
    }
});

