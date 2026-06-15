const API_USUARIO = "apis_usuario.php";

async function mostrarMisReservas() {

    let modal = document.getElementById(
        "modalMisReservas"
    );

    if (!modal) {

        crearModal();

        modal = document.getElementById(
            "modalMisReservas"
        );
    }

    modal.style.display = "flex";

    const tbody =
        document.getElementById(
            "tablaReservasBody"
        );

    tbody.innerHTML = `
        <tr>
            <td colspan="5">
                Cargando...
            </td>
        </tr>
    `;

    const respuesta = await fetch(
        `${API_USUARIO}?accion=obtener_mis_reservas`
    );

    const resultado =
        await respuesta.json();

    tbody.innerHTML = "";

    if (
        !resultado.ok ||
        resultado.datos.length === 0
    ) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5">
                    No tienes reservas.
                </td>
            </tr>
        `;

        return;
    }

    resultado.datos.forEach(
        reserva => {

            tbody.innerHTML += `
                <tr>
                    <td>${reserva.videobeam}</td>
                    <td>${reserva.fecha}</td>
                    <td>${reserva.hora_inicio}</td>
                    <td>${reserva.hora_fin}</td>
                    <td>
                        ${formatearEstado(
                            reserva.estado
                        )}
                    </td>
                </tr>
            `;

        }
    );
}

function cerrarMisReservas() {

    document.getElementById(
        "modalMisReservas"
    ).style.display = "none";

}

function crearModal() {

    const html = `
        <div
            id="modalMisReservas"
            class="overlay"
            style="display:none;"
        >

            <div class="modal">

                <div class="cabecera">

                    <h2>
                        Mis Reservas
                    </h2>

                    <button
                        onclick="cerrarMisReservas()"
                    >
                        X
                    </button>

                </div>

                <table>

                    <thead>
                        <tr>
                            <th>Videobeam</th>
                            <th>Fecha</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody
                        id="tablaReservasBody"
                    >
                    </tbody>

                </table>

            </div>

        </div>
    `;

    document.body.insertAdjacentHTML(
        "beforeend",
        html
    );
}

function formatearEstado(
    estado
) {

    switch (estado) {

        case "pendiente":
            return "🟡 Pendiente";

        case "aprobada":
            return "🟢 Aprobada";

        case "rechazada":
            return "🔴 Rechazada";

        case "entregado":
            return "🔵 Entregado";

        case "devuelto":
            return "⚪ Devuelto";

        default:
            return estado;
    }
}