document.addEventListener("DOMContentLoaded", () => {

    fetch("obtener_solicitudes.php")
        .then(response => response.json())
        .then(data => {

            let tabla = document.getElementById("tablaSolicitudes");

            data.forEach(reserva => {

                tabla.innerHTML += `
                    <tr>
                        <td>${reserva.nombre}</td>
                        <td>${reserva.correo}</td>
                        <td>${reserva.videobeam}</td>
                        <td>${reserva.fecha}</td>
                        <td>${reserva.hora_inicio}</td>
                        <td>${reserva.hora_fin}</td>
                    </tr>
                `;

            });

        });

});