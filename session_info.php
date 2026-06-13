<?php
session_start();
header('Content-Type: application/json');

echo json_encode([
    'id' => $_SESSION['id'] ?? null, 
    'nombre' => $_SESSION['nombre'] ?? null,
    'documento' => $_SESSION['documento'] ?? null,
    // Asegurar que 'rol' se devuelva como entero cuando exista, o null si no
    'rol' => (isset($_SESSION['rol']) && $_SESSION['rol'] !== '') ? (int) $_SESSION['rol'] : null,
]);

