<?php
session_start();

require_once '../config.php';

header('Content-Type: application/json');

$correo   = $_POST['correo']   ?? '';
$password = $_POST['password'] ?? '';

if (empty($correo) || empty($password)) {

    echo json_encode([
        "ok"      => false,
        "mensaje" => "Correo y contraseña son obligatorios."
    ]);

    exit;
}

$sql = "
    SELECT id, nombre, correo, password, rol
    FROM usuarios
    WHERE correo = ?
    LIMIT 1
";

$stmt = $pdo->prepare($sql);
$stmt->execute([$correo]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$usuario || $usuario['password'] !== $password) {

    echo json_encode([
        "ok"      => false,
        "mensaje" => "Correo o contraseña incorrectos."
    ]);

    exit;
}

$_SESSION['id']        = $usuario['id'];
$_SESSION['nombre']    = $usuario['nombre'];
$_SESSION['rol']       = $usuario['rol'];
$_SESSION['documento'] = null;

echo json_encode([
    "ok"      => true,
    "mensaje" => "Bienvenido, " . $usuario['nombre'],
    "rol"     => $usuario['rol']
]);