<?php
require_once '../config.php';

header('Content-Type: application/json');

$accion = $_REQUEST['accion'] ?? '';

switch($accion) {

    case 'obtener_devoluciones':
        // Obtener reservas entregadas para devolver
        $sql = "
            SELECT
                reservas.id,
                usuarios.nombre AS usuario,
                videobeams.nombre AS videobeam,
                videobeams.id AS videobeam_id,
                reservas.fecha,
                reservas.estado
            FROM reservas
            INNER JOIN usuarios ON reservas.usuario_id = usuarios.id
            INNER JOIN videobeams ON reservas.videobeam_id = videobeams.id
            WHERE reservas.estado = 'entregado'
            ORDER BY reservas.fecha ASC
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        echo json_encode([
            "ok" => true,
            "datos" => $stmt->fetchAll(PDO::FETCH_ASSOC)
        ]);

    break;

    case 'registrar_devolucion':
        // Registrar devolución de equipos
        
        $reserva_id = $_POST['reserva_id'] ?? null;
        $videobeam_id = $_POST['videobeam_id'] ?? null;

        if (!$reserva_id || !$videobeam_id) {
            echo json_encode([
                "ok" => false,
                "mensaje" => "Datos incompletos"
            ]);
            exit;
        }

        try {
            // Iniciar transacción
            $pdo->beginTransaction();

            // 1. Cambiar estado de reserva a 'devuelto'
            $sql_reserva = "UPDATE reservas SET estado = 'devuelto' WHERE id = ?";
            $stmt_reserva = $pdo->prepare($sql_reserva);
            $stmt_reserva->execute([$reserva_id]);

            // 2. Cambiar estado de videobeam a 'disponible'
            $sql_videobeam = "UPDATE videobeams SET estado = 'disponible' WHERE id = ?";
            $stmt_videobeam = $pdo->prepare($sql_videobeam);
            $stmt_videobeam->execute([$videobeam_id]);

            // Confirmar transacción
            $pdo->commit();

            echo json_encode([
                "ok" => true,
                "mensaje" => "Devolución registrada exitosamente"
            ]);

        } catch (Exception $e) {
            $pdo->rollBack();
            
            echo json_encode([
                "ok" => false,
                "mensaje" => "Error al registrar devolución: " . $e->getMessage()
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
