<?php
// config.php

$server = 'localhost:3306'; // sin espacios después de ':' o da error
$username = 'root';
$password = '12345';
$database = 'reserva_videobeams';

try {
    $pdo  = new PDO("mysql:host=$server;dbname=$database;charset=utf8", $username, $password);
    $pdo ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Si estás llamando este archivo desde una API, necesitas devolver JSON válido
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "error" => "Error de conexión: " . $e->getMessage()
    ]);
    exit;
}
?>
