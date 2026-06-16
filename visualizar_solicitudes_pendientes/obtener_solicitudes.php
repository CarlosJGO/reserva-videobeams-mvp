<?php

require_once '../config.php';

header('Content-Type: application/json');

$accion = $_REQUEST['accion'] ?? 'obtener_solicitudes';

switch($accion) {

    case 'obtener_solicitudes':
        try {
            $sql = "
            SELECT
                reservas.id,
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
            ORDER BY reservas.fecha ASC
            ";

            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($datos);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                "ok" => false,
                "error" => $e->getMessage()
            ]);
        }
    break;

   case 'aprobar_solicitud':

    $reserva_id = $_POST['reserva_id'] ?? null;

    if (!$reserva_id) {
        echo json_encode([
            "ok" => false,
            "mensaje" => "No se recibió el id de la reserva"
        ]);
        exit;
    }

    try {

        $pdo->beginTransaction();

        // Obtener videobeam asociado
        $stmt = $pdo->prepare("
            SELECT videobeam_id
            FROM reservas
            WHERE id = ?
        ");

        $stmt->execute([$reserva_id]);

        $reserva = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$reserva) {
            throw new Exception("Reserva no encontrada");
        }

        // Aprobar reserva
        $stmt = $pdo->prepare("
            UPDATE reservas
            SET estado = 'aprobada'
            WHERE id = ?
        ");

        $stmt->execute([$reserva_id]);

        // Cambiar estado del videobeam
        $stmt = $pdo->prepare("
            UPDATE videobeams
            SET estado = 'prestado'
            WHERE id = ?
        ");

        $stmt->execute([$reserva['videobeam_id']]);

        $pdo->commit();

        echo json_encode([
            "ok" => true,
            "mensaje" => "Reserva aprobada y videobeam marcado como prestado"
        ]);

    } catch (Exception $e) {

        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }

        echo json_encode([
            "ok" => false,
            "mensaje" => $e->getMessage()
        ]);
    }

break;

    case 'rechazar_solicitud':
        $reserva_id = $_POST['reserva_id'] ?? null;

        if (!$reserva_id) {
            echo json_encode([
                "ok" => false,
                "mensaje" => "Datos incompletos"
            ]);
            exit;
        }

        try {
            $sql = "UPDATE reservas SET estado = 'rechazada' WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$reserva_id]);

            echo json_encode([
                "ok" => true,
                "mensaje" => "Solicitud rechazada exitosamente"
            ]);

        } catch (Exception $e) {
            echo json_encode([
                "ok" => false,
                "mensaje" => "Error al rechazar solicitud: " . $e->getMessage()
            ]);
        }
    break;

    default:
        echo json_encode([
            "ok" => false,
            "mensaje" => "Acción no reconocida"
        ]);
}
?>