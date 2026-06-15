document.addEventListener("DOMContentLoaded", () => {
    cargarSolicitudes();
});

function cargarSolicitudes() {
    const cargando = document.getElementById("cargando");
    const contenedor = document.getElementById("contenedor-solicitudes");
    
    cargando.style.display = "flex";
    contenedor.innerHTML = '';

    fetch("obtener_solicitudes.php?accion=obtener_solicitudes")
        .then(response => response.json())
        .then(data => {
            cargando.style.display = "none";

            if (data.length === 0) {
                mostrarMensajeVacio("No hay solicitudes pendientes", "Todas las solicitudes han sido procesadas");
                return;
            }

            data.forEach((solicitud, index) => {
                const tarjeta = crearTarjeta(solicitud, index);
                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => {
            cargando.style.display = "none";
            console.error("Error al cargar solicitudes:", error);
            mostrarMensajeVacio("Error de conexión", "No se pudieron cargar las solicitudes");
        });
}

function crearTarjeta(solicitud, index) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-solicitud';
    tarjeta.style.animationDelay = `${index * 0.1}s`;
    
    const fecha = new Date(solicitud.fecha);
    const fechaFormato = fecha.toLocaleDateString('es-ES', { 
        weekday: 'short',
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });

    tarjeta.innerHTML = `
        <div class="tarjeta-cabecera">
            <div class="info-usuario">
                <h3>${solicitud.nombre}</h3>
                <p>${solicitud.correo}</p>
            </div>
            <div style="font-size: 35px;">👤</div>
        </div>

        <div class="detalles">
            <div class="detalle-item">
                <span>📹 Equipo:</span>
                <span>${solicitud.videobeam}</span>
            </div>
            <div class="detalle-item">
                <span>📅 Fecha:</span>
                <span>${fechaFormato}</span>
            </div>
            <div class="detalle-item">
                <span>🕐 Inicio:</span>
                <span>${solicitud.hora_inicio}</span>
            </div>
            <div class="detalle-item">
                <span>🕐 Fin:</span>
                <span>${solicitud.hora_fin}</span>
            </div>
        </div>

        <div class="acciones">
            <button class="btn btn-aprobar" onclick="aprobarSolicitud(${solicitud.id}, this)">
                ✓ Aprobar
            </button>
            <button class="btn btn-rechazar" onclick="rechazarSolicitud(${solicitud.id}, this)">
                ✕ Rechazar
            </button>
        </div>
    `;

    return tarjeta;
}

function mostrarMensajeVacio(titulo, subtitulo) {
    const contenedor = document.getElementById("contenedor-solicitudes");
    contenedor.innerHTML = `
        <div class="mensaje-vacio">
            <h2>${titulo}</h2>
            <p>${subtitulo}</p>
        </div>
    `;
}

function aprobarSolicitud(reservaId, boton) {
    if (!confirm("¿Deseas aprobar esta solicitud?")) {
        return;
    }

    boton.disabled = true;
    boton.textContent = "⏳ Procesando...";

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
            mostrarNotificacion(data.mensaje, 'exito');
            setTimeout(() => cargarSolicitudes(), 1500);
        } else {
            mostrarNotificacion("Error: " + data.mensaje, 'error');
            boton.disabled = false;
            boton.textContent = "✓ Aprobar";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        mostrarNotificacion("Error de conexión", 'error');
        boton.disabled = false;
        boton.textContent = "✓ Aprobar";
    });
}

function rechazarSolicitud(reservaId, boton) {
    if (!confirm("¿Deseas rechazar esta solicitud?")) {
        return;
    }

    boton.disabled = true;
    boton.textContent = "⏳ Procesando...";

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
            mostrarNotificacion(data.mensaje, 'exito');
            setTimeout(() => cargarSolicitudes(), 1500);
        } else {
            mostrarNotificacion("Error: " + data.mensaje, 'error');
            boton.disabled = false;
            boton.textContent = "✕ Rechazar";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        mostrarNotificacion("Error de conexión", 'error');
        boton.disabled = false;
        boton.textContent = "✕ Rechazar";
    });
}

function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'exito' ? '#A6E0CF' : '#C1C9E4'};
        color: #2c3e50;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.4s ease;
        font-weight: 600;
    `;

    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => notificacion.remove(), 400);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);