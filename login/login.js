document.addEventListener(
    "DOMContentLoaded",
    () => {
        document
            .getElementById("formLogin")
            .addEventListener(
                "submit",
                iniciarSesion
            );
    }
);

async function iniciarSesion(evento) {

    evento.preventDefault();

    const datos = new FormData(
        document.getElementById("formLogin")
    );

    const mensaje = document.getElementById("mensaje");

    try {

        const respuesta = await fetch(
            "api_login.php",
            {
                method: "POST",
                body: datos
            }
        );

        const resultado = await respuesta.json();

        mensaje.textContent = resultado.mensaje;
        mensaje.style.color = resultado.ok ? "green" : "red";

        if (resultado.ok) {

            if (resultado.rol === "administrador") {
                window.location.href =
                    "../ref_admin/dashboard_admin.php";
            } else {
                window.location.href =
                    "../ref_usuario/dashboard_usuario.php";
            }

        }

    } catch (error) {

        mensaje.textContent = "Error de conexión. Intente nuevamente.";
        mensaje.style.color = "red";

    }

}