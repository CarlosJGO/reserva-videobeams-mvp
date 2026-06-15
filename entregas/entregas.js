document.addEventListener("DOMContentLoaded", () => {
    cargarEntregas();
});

function cargarEntregas() {
    fetch("entregas.php?accion=obtener_entregas")
        .then(response => response.json())
        .then(data => {

            if (!data.ok) {
                console.error("Error:", data.mensaje);
                return;
            }

            let tabla = document.getElementById("tablaEntregas");
            tabla.innerHTML = '';

            if (data.datos.length === 0) {
                tabla.innerHTML = '<tr><td colspan="5">No hay entregas pendientes</td></tr>';
                return;
            }

            data.datos.forEach(entrega => {

                tabla.innerHTML += `
                    <tr>
                        <td>${entrega.usuario}</td>
                        <td>${entrega.videobeam}</td>
                        <td>${entrega.fecha}</td>
                        <td><span class="estado">${entrega.estado}</span></td>
                        <td>
                            <button onclick="registrarEntrega(${entrega.id}, ${entrega.videobeam_id})">
                                Entregar
                            </button>
                        </td>
                    </tr>
                `;

            });

        })
        .catch(error => console.error("Error al cargar entregas:", error));
}

function registrarEntrega(reservaId, videobeamId) {

    if (!confirm("¿Confirmar que se entregó el equipo?")) {
        return;
    }

    const formData = new FormData();
    formData.append('accion', 'registrar_entrega');
    formData.append('reserva_id', reservaId);
    formData.append('videobeam_id', videobeamId);

    fetch("entregas.php", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (data.ok) {
            alert(data.mensaje);
            cargarEntregas();
        } else {
            alert("Error: " + data.mensaje);
        }

    })
    .catch(error => console.error("Error:", error));
}
