document.addEventListener("DOMContentLoaded", () => {
    cargarDevoluciones();
});

function cargarDevoluciones() {
    fetch("devoluciones.php?accion=obtener_devoluciones")
        .then(response => response.json())
        .then(data => {

            if (!data.ok) {
                console.error("Error:", data.mensaje);
                return;
            }

            let tabla = document.getElementById("tablaDevoluciones");
            tabla.innerHTML = '';

            if (data.datos.length === 0) {
                tabla.innerHTML = '<tr><td colspan="5">No hay devoluciones pendientes</td></tr>';
                return;
            }

            data.datos.forEach(devolucion => {

                tabla.innerHTML += `
                    <tr>
                        <td>${devolucion.usuario}</td>
                        <td>${devolucion.videobeam}</td>
                        <td>${devolucion.fecha}</td>
                        <td><span class="estado">${devolucion.estado}</span></td>
                        <td>
                            <button onclick="registrarDevolucion(${devolucion.id}, ${devolucion.videobeam_id})">
                                Registrar devolución
                            </button>
                        </td>
                    </tr>
                `;

            });

        })
        .catch(error => console.error("Error al cargar devoluciones:", error));
}

function registrarDevolucion(reservaId, videobeamId) {

    if (!confirm("¿Confirmar que se devolvió el equipo?")) {
        return;
    }

    const formData = new FormData();
    formData.append('accion', 'registrar_devolucion');
    formData.append('reserva_id', reservaId);
    formData.append('videobeam_id', videobeamId);

    fetch("devoluciones.php", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (data.ok) {
            alert(data.mensaje);
            cargarDevoluciones();
        } else {
            alert("Error: " + data.mensaje);
        }

    })
    .catch(error => console.error("Error:", error));
}
