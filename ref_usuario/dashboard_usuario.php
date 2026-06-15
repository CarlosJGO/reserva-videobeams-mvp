<?php
session_start();

if (!isset($_SESSION['id']) || $_SESSION['rol'] !== 'usuario') {
    header('Location: ../login/login.html');
    exit;
}

$nombre = $_SESSION['nombre'];
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Usuario</title>
    <link rel="stylesheet" href="css/dashboard_usuario.css">
</head>

<body>

    <nav class="navbar">
        <span class="nav-titulo">Reserva de Videobeams</span>
        <div class="nav-links">
            <a href="dashboard_usuario.php">Inicio</a>
            <a href="nueva_reserva/nueva_reserva.html">Nueva Reserva</a>
            <a href="mis_reservas/mis_reservas.html">Mis Reservas</a>
            <a href="../login/cerrar_sesion.php">Cerrar sesión</a>
        </div>
    </nav>

    <main class="contenido">

        <h1>Bienvenido, <?= htmlspecialchars($nombre) ?></h1>

        <div class="tarjetas">

            <div class="tarjeta">
                <span class="tarjeta-numero" id="total">...</span>
                <span class="tarjeta-label">Total de reservas</span>
            </div>

            <div class="tarjeta">
                <span class="tarjeta-numero" id="pendientes">...</span>
                <span class="tarjeta-label">Pendientes</span>
            </div>

            <div class="tarjeta">
                <span class="tarjeta-numero" id="aprobadas">...</span>
                <span class="tarjeta-label">Aprobadas</span>
            </div>

        </div>

    </main>

    <script src="js/dashboard_usuario.js"></script>

</body>

</html>