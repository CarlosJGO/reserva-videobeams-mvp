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
            "../../apis_usuario.php?accion=obtener_videobeams"
        );

        const resultado =
            await respuesta.json();

        const select =
            document.getElementById(
                "videobeam"
            );

        select.innerHTML =
            '<option value="">Seleccione un videobeam</option>';

        resultado.datos.forEach(
            videobeam => {

                select.innerHTML += `
                    <option value="${videobeam.id}">
                        ${videobeam.nombre}
                    </option>
                `;

            }
        );

    }
    catch(error){

        console.error(error);

    }

}

async function guardarReserva(evento){

    evento.preventDefault();

    const form =
        document.getElementById(
            "formReserva"
        );

    const datos =
        new FormData(form);

    datos.append(
        "accion",
        "crear_reserva"
    );

    const respuesta =
        await fetch(
            "../../apis_usuario.php",
            {
                method:"POST",
                body:datos
            }
        );

    const resultado =
        await respuesta.json();

    const mensaje =
        document.getElementById(
            "mensaje"
        );

    mensaje.textContent =
        resultado.mensaje;

    mensaje.style.color =
        resultado.ok
            ? "green"
            : "red";

    if(resultado.ok){

        form.reset();

    }

}