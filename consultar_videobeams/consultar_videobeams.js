document.addEventListener("DOMContentLoaded", () => {
    cargarVideobeams();
});

function cargarVideobeams() {
    const cargando = document.getElementById("cargando");
    const contenedor = document.getElementById("contenedor-videobeams");
    
    cargando.style.display = "flex";
    contenedor.innerHTML = '';

    fetch("obtener_videobeams.php")
        .then(response => response.json())
        .then(data => {
            cargando.style.display = "none";

            if (data.length === 0) {
                mostrarMensajeVacio("No hay videobeams", "Por el momento no hay equipos disponibles");
                return;
            }

            data.forEach((videobeam, index) => {
                const tarjeta = crearTarjeta(videobeam, index);
                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => {
            cargando.style.display = "none";
            console.error("Error:", error);
            mostrarMensajeVacio("Error de conexión", "No se pudo cargar los videobeams");
        });
}

function crearTarjeta(videobeam, index) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';
    tarjeta.style.animation = `desplizarEntrada 0.6s ease-out ${index * 0.1}s both`;
    
    const estadoBadge = videobeam.estado === 'disponible' ? 'disponible' : 'prestado';
    const iconoEstado = videobeam.estado === 'disponible' ? '✓' : '🔒';
    const textoEstado = videobeam.estado === 'disponible' ? 'Disponible' : 'Prestado';

    tarjeta.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
            <div>
                <h3 class="tarjeta-titulo">${videobeam.nombre}</h3>
                <p class="tarjeta-id">ID: #${videobeam.id}</p>
            </div>
            <div style="font-size: 40px;">📺</div>
        </div>
        <p class="tarjeta-descripcion">${videobeam.descripcion}</p>
        <span class="estado-badge ${estadoBadge}">${iconoEstado} ${textoEstado}</span>
    `;

    return tarjeta;
}

function mostrarMensajeVacio(titulo, subtitulo) {
    const contenedor = document.getElementById("contenedor-videobeams");
    contenedor.innerHTML = `
        <div class="mensaje-vacio">
            <h2>${titulo}</h2>
            <p>${subtitulo}</p>
        </div>
    `;
}