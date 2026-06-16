document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formLogin");
    const togglePasswordBtn = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    // Evento de envío del formulario
    formulario.addEventListener("submit", iniciarSesion);

    // Toggle para mostrar/ocultar contraseña
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const tipo = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", tipo);
            
            const icono = togglePasswordBtn.querySelector("i");
            icono.classList.toggle("fa-eye");
            icono.classList.toggle("fa-eye-slash");
        });
    }

    // Auto-completar email si estaba guardado
    const correoGuardado = localStorage.getItem("correo_guardado");
    if (correoGuardado) {
        document.getElementById("correo").value = correoGuardado;
        document.getElementById("recordarme").checked = true;
    }
});

async function iniciarSesion(evento) {
    evento.preventDefault();

    const formulario = document.getElementById("formLogin");
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const recordarme = document.getElementById("recordarme").checked;
    const btnIngresar = formulario.querySelector(".btn-ingresar");
    const mensaje = document.getElementById("mensaje");

    // Validaciones básicas
    if (!correo || !password) {
        mostrarMensaje("Por favor completa todos los campos", "error");
        return;
    }

    if (password.length < 3) {
        mostrarMensaje("La contraseña debe tener al menos 3 caracteres", "error");
        return;
    }

    // Deshabilitar botón durante la solicitud
    btnIngresar.disabled = true;
    btnIngresar.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Procesando...</span>';

    try {
        mostrarMensaje("Verificando credenciales...", "cargando");

        const datos = new FormData(formulario);

        const respuesta = await fetch("api_login.php", {
            method: "POST",
            body: datos
        });

        if (!respuesta.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const resultado = await respuesta.json();

        if (resultado.ok) {
            // Guardar email si está marcado "Recuérdame"
            if (recordarme) {
                localStorage.setItem("correo_guardado", correo);
            } else {
                localStorage.removeItem("correo_guardado");
            }

            mostrarMensaje("✓ ¡Login exitoso! Redireccionando...", "exito");

            // Redirigir según el rol
            setTimeout(() => {
                const rol = resultado.datos?.usuario_rol || resultado.rol;
                if (rol === "administrador") {
                    window.location.href = "../ref_admin/dashboard_admin.php";
                } else {
                    window.location.href = "../ref_usuario/dashboard_usuario.php";
                }
            }, 1500);
        } else {
            mostrarMensaje(resultado.mensaje || "Error en las credenciales", "error");
            btnIngresar.disabled = false;
            btnIngresar.innerHTML = '<span>Ingresar</span><i class="fas fa-arrow-right"></i>';
        }

    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error de conexión. Intenta nuevamente.", "error");
        btnIngresar.disabled = false;
        btnIngresar.innerHTML = '<span>Ingresar</span><i class="fas fa-arrow-right"></i>';
    }
}

function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.className = "mensaje-alerta " + tipo;
}