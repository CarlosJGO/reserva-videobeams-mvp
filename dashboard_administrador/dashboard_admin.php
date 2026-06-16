<?php

require_once '../config.php';

$pendientes = $pdo->query("
    SELECT COUNT(*) AS total
    FROM reservas
    WHERE estado = 'pendiente'
")->fetch(PDO::FETCH_ASSOC)['total'];

$aprobadas = $pdo->query("
    SELECT COUNT(*) AS total
    FROM reservas
    WHERE estado = 'aprobada'
")->fetch(PDO::FETCH_ASSOC)['total'];

$disponibles = $pdo->query("
    SELECT COUNT(*) AS total
    FROM videobeams
    WHERE estado = 'disponible'
")->fetch(PDO::FETCH_ASSOC)['total'];

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Dashboard Administrador</title>

    <link rel="stylesheet" href="dashboard_admin.css">
</head>

<body>

<div class="contenedor">

    <aside class="menu">

        <h2>Administrador</h2>

        <ul>
            <li><a href="dashboard_admin.php">Inicio</a></li>
            <li><a href="../visualizar_solicitudes_pendientes/visualizar.html">Solicitudes</a></li>
            <li><a href="../entregas/entregas.html">Entregas</a></li>
            <li><a href="../devoluciones/devoluciones.html">Devoluciones</a></li>
            <li><a href="../login/login.html">Cerrar Sesión</a></li>
        </ul>

    </aside>

    <main class="contenido">

        <h1>Panel de Administración</h1>

        <div class="tarjetas">

            <div class="tarjeta">
                <h3>Reservas Pendientes</h3>
                <p><?php echo $pendientes; ?></p>
            </div>

            <div class="tarjeta">
                <h3>Reservas Aprobadas</h3>
                <p><?php echo $aprobadas; ?></p>
            </div>

            <div class="tarjeta">
                <h3>Videobeams Disponibles</h3>
                <p><?php echo $disponibles; ?></p>
            </div>

        </div>

    </main>

</div>

</body>
</html>