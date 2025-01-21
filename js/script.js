document.getElementById("formulario").addEventListener("submit", async function (e) {
    e.preventDefault();  

    // Captura de los datos del formulario
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data); // Verifica los datos en la consola

    try {
        // Enviar los datos al servidor
        const response = await fetch("http://localhost:3000/guardar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Formulario enviado exitosamente.");
        } else {
            alert("Hubo un problema al enviar el formulario.");
        }
    } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("No se pudo enviar el formulario. Inténtalo de nuevo más tarde.");
    }
});
