document.addEventListener(
    "DOMContentLoaded",
    cargarResumen
);

async function cargarResumen() {

    try {

        const respuesta = await fetch(
            "apis_usuario.php?accion=resumen_usuario"
        );
        
        const resultado = await respuesta.json();

        if (resultado.ok) {

            document.getElementById("total").textContent =
                resultado.datos.total;

            document.getElementById("pendientes").textContent =
                resultado.datos.pendientes;

            document.getElementById("aprobadas").textContent =
                resultado.datos.aprobadas;

        }

    } catch (error) {

        console.error("Error cargando resumen:", error);

    }

}