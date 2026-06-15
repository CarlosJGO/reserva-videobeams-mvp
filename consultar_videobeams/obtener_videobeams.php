<?php
require_once '../config.php'; // ajusta la ruta según tu estructura

try {
    $sql = "SELECT * FROM videobeams";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $videobeams = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($videobeams);

} catch (PDOException $e) {
    http_response_code(500);

    echo json_encode([
        "ok" => false,
        "error" => $e->getMessage()
    ]);
}
?>