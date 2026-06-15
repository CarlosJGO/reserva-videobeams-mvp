<?php

$conexion = new mysqli(
    "localhost",
    "root",
    "",
    "reserva_videobeams"
);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$sql = "SELECT * FROM videobeams";

$resultado = $conexion->query($sql);

$videobeams = [];

while($fila = $resultado->fetch_assoc()){
    $videobeams[] = $fila;
}

header('Content-Type: application/json');
echo json_encode($videobeams);

?>