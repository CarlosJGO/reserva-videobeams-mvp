<?php

require_once '../config.php'; // Ajusta la ruta según tu estructura

try {

    $sql = "
    SELECT
        usuarios.nombre,
        usuarios.correo,
        videobeams.nombre AS videobeam,
        reservas.fecha,
        reservas.hora_inicio,
        reservas.hora_fin
    FROM reservas
    INNER JOIN usuarios
        ON reservas.usuario_id = usuarios.id
    INNER JOIN videobeams
        ON reservas.videobeam_id = videobeams.id
    WHERE reservas.estado = 'pendiente'
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($datos);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "ok" => false,
        "error" => $e->getMessage()
    ]);
}
?>