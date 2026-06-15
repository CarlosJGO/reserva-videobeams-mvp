document.addEventListener(
    "DOMContentLoaded",
    () => {
        cargarVideobeams();
        document
            .getElementById("formReserva")
            .addEventListener(
                "submit",
                guardarReserva
            );
    }
);

async function cargarVideobeams(){
    try{
        const respuesta = await fetch(
            "../apis_usuario.php?accion=obtener_videobeams"
        );
        const resultado = await respuesta.json();
        const select = document.getElementById("videobeam");
        select.innerHTML = '<option value="">Seleccione un videobeam</option>';
        resultado.datos.forEach(videobeam => {
            select.innerHTML += `
                <option value="${videobeam.id}">
                    ${videobeam.nombre}
                </option>
            `;
        });
    }
    catch(error){
        console.error(error);
        mostrarMensaje("Error al cargar videobeams", false);
    }
}

async function guardarReserva(evento){
    evento.preventDefault();
    const form = document.getElementById("formReserva");
    const datos = new FormData(form);
    datos.append("accion", "crear_reserva");
    const boton = form.querySelector('button[type="submit"]');
    boton.disabled = true;
    boton.textContent = "⏳ Procesando...";

    try {
        const respuesta = await fetch(
            "../apis_usuario.php",
            {
                method:"POST",
                body:datos
            }
        );
        const resultado = await respuesta.json();
        mostrarMensaje(resultado.mensaje, resultado.ok);
        if(resultado.ok){
            form.reset();
            boton.textContent = "✓ Solicitar Reserva";
            boton.disabled = false;
        } else {
            boton.disabled = false;
            boton.textContent = "✓ Solicitar Reserva";
        }
    } catch(error) {
        console.error(error);
        mostrarMensaje("Error al procesar la solicitud", false);
        boton.disabled = false;
        boton.textContent = "✓ Solicitar Reserva";
    }
}

function mostrarMensaje(texto, esExito) {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.className = "mensaje";
    if(esExito) {
        mensaje.classList.add("exito");
    } else {
        mensaje.classList.add("error");
    }
    setTimeout(() => {
        mensaje.className = "mensaje";
    }, 4000);
}