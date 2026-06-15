document.addEventListener("DOMContentLoaded", () => {
    cargarDevoluciones();
});

function cargarDevoluciones() {
    const cargando = document.getElementById("cargando");
    const contenedor = document.getElementById("contenedor-devoluciones");
    
    cargando.style.display = "flex";
    contenedor.innerHTML = '';

    fetch("devoluciones.php?accion=obtener_devoluciones")
        .then(response => response.json())
        .then(data => {
            cargando.style.display = "none";

            if (!data.ok) {
                console.error("Error:", data.mensaje);
                mostrarMensajeVacio("Error al cargar devoluciones", "Intenta nuevamente");
                return;
            }

            if (data.datos.length === 0) {
                mostrarMensajeVacio(
                    "No hay devoluciones pendientes",
                    "Todos los equipos entregados han sido devueltos ✓"
                );
                return;
            }

            data.datos.forEach((devolucion, index) => {
                const tarjeta = crearTarjeta(devolucion, index);
                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => {
            cargando.style.display = "none";
            console.error("Error al cargar devoluciones:", error);
            mostrarMensajeVacio("Error de conexión", "No se pudo conectar al servidor");
        });
}

function crearTarjeta(devolucion, index) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';
    tarjeta.style.animationDelay = `${index * 0.1}s`;
    
    const fecha = new Date(devolucion.fecha);
    const fechaFormato = fecha.toLocaleDateString('es-ES', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    tarjeta.innerHTML = `
        <div class="tarjeta-cabecera">
            <div class="info-basica">
                <h3>${devolucion.usuario}</h3>
                <p style="color: #999; font-size: 0.9em;">Reserva #${devolucion.id}</p>
            </div>
            <div class="icono-videobeam">📺</div>
        </div>

        <div class="detalles">
            <div class="detalle-item">
                <span>📦 Equipo:</span>
                <span>${devolucion.videobeam}</span>
            </div>
            <div class="detalle-item">
                <span>📅 Fecha:</span>
                <span>${fechaFormato}</span>
            </div>
            <div class="detalle-item">
                <span>Estado:</span>
                <span class="etiqueta-estado">${devolucion.estado}</span>
            </div>
        </div>

        <div class="acciones">
            <button class="btn btn-devolver" onclick="registrarDevolucion(${devolucion.id}, ${devolucion.videobeam_id}, this)">
                ✓ Registrar Devolución
            </button>
        </div>
    `;

    return tarjeta;
}

function mostrarMensajeVacio(titulo, subtitulo) {
    const contenedor = document.getElementById("contenedor-devoluciones");
    contenedor.innerHTML = `
        <div class="mensaje-vacio">
            <h2>😎 ${titulo}</h2>
            <p>${subtitulo}</p>
        </div>
    `;
}

function registrarDevolucion(reservaId, videobeamId, boton) {
    if (!confirm("¿Confirmar que se devolvió el equipo?")) {
        return;
    }

    boton.disabled = true;
    boton.textContent = "⏳ Procesando...";

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
            mostrarNotificacion(data.mensaje, 'exito');
            setTimeout(() => cargarDevoluciones(), 1500);
        } else {
            mostrarNotificacion("Error: " + data.mensaje, 'error');
            boton.disabled = false;
            boton.textContent = "✓ Registrar Devolución";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        mostrarNotificacion("Error de conexión", 'error');
        boton.disabled = false;
        boton.textContent = "✓ Registrar Devolución";
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
