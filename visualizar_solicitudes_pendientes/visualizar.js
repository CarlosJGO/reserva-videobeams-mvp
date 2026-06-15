document.addEventListener("DOMContentLoaded", () => {
    cargarSolicitudes();
});

function cargarSolicitudes() {
    fetch("obtener_solicitudes.php?accion=obtener_solicitudes")
        .then(response => response.json())
        .then(data => {

            let tabla = document.getElementById("tablaSolicitudes");
            tabla.innerHTML = '';

            if (data.length === 0) {
                tabla.innerHTML = '<tr><td colspan="7">No hay solicitudes pendientes</td></tr>';
                return;
            }

            data.forEach(reserva => {

                tabla.innerHTML += `
                    <tr>
                        <td>${reserva.nombre}</td>
                        <td>${reserva.correo}</td>
                        <td>${reserva.videobeam}</td>
                        <td>${reserva.fecha}</td>
                        <td>${reserva.hora_inicio}</td>
                        <td>${reserva.hora_fin}</td>
                        <td>
                            <button class="aprobar" onclick="aprobarSolicitud(${reserva.id})">Aprobar</button>
                            <button class="rechazar" onclick="rechazarSolicitud(${reserva.id})">Rechazar</button>
                        </td>
                    </tr>
                `;

            });

        })
        .catch(error => console.error("Error al cargar solicitudes:", error));
}

function aprobarSolicitud(reservaId) {
    if (!confirm("¿Deseas aprobar esta solicitud?")) {
        return;
    }

    const formData = new FormData();
    formData.append('accion', 'aprobar_solicitud');
    formData.append('reserva_id', reservaId);

    fetch("obtener_solicitudes.php", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert(data.mensaje);
            cargarSolicitudes();
        } else {
            alert("Error: " + data.mensaje);
        }
    })
    .catch(error => console.error("Error:", error));
}

function rechazarSolicitud(reservaId) {
    if (!confirm("¿Deseas rechazar esta solicitud?")) {
        return;
    }

    const formData = new FormData();
    formData.append('accion', 'rechazar_solicitud');
    formData.append('reserva_id', reservaId);

    fetch("obtener_solicitudes.php", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert(data.mensaje);
            cargarSolicitudes();
        } else {
            alert("Error: " + data.mensaje);
        }
    })
    .catch(error => console.error("Error:", error));
}