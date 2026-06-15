<?php

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "reserva_videobeams"
);

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

$resultado = $conn->query($sql);

$datos = [];

while($fila = $resultado->fetch_assoc()){
    $datos[] = $fila;
}

echo json_encode($datos);

$conn->close();

?>