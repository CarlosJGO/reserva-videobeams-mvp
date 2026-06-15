<?php
session_start();
//$_SESSION['id'] = 2;

require_once '../config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['id'])) {

    echo json_encode([
        "ok" => false,
        "mensaje" => "Debe iniciar sesión."
    ]);

    exit;
}

$accion = $_REQUEST['accion'] ?? '';

switch($accion){

    case 'obtener_videobeams':
        $sql = "
            SELECT
                id,
                nombre
            FROM videobeams
            WHERE estado='disponible'
            ORDER BY nombre
        ";

        $stmt = $pdo->prepare($sql);

        $stmt->execute();

        echo json_encode([
            "ok" => true,
            "datos" => $stmt->fetchAll(PDO::FETCH_ASSOC)
        ]);

    break;

    case 'crear_reserva':

        $usuario_id =
            $_SESSION['id'];

        $videobeam_id =
            $_POST['videobeam_id'];

        $fecha =
            $_POST['fecha'];

        $hora_inicio =
            $_POST['hora_inicio'];

        $hora_fin =
            $_POST['hora_fin'];

        if($hora_inicio >= $hora_fin){

            echo json_encode([
                "ok" => false,
                "mensaje" =>
                    "La hora final debe ser mayor que la hora inicial."
            ]);

            exit;
        }

        $sql = "
            SELECT COUNT(*) total
            FROM reservas
            WHERE videobeam_id = ?
            AND fecha = ?
            AND (
                hora_inicio < ?
                AND hora_fin > ?
            )
        ";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            $videobeam_id,
            $fecha,
            $hora_fin,
            $hora_inicio
        ]);

        $conflicto =
            $stmt->fetch(PDO::FETCH_ASSOC);

        if($conflicto['total'] > 0){

            echo json_encode([
                "ok" => false,
                "mensaje" =>
                    "Ya existe una reserva para ese horario."
            ]);

            exit;
        }

        $sql = "
            INSERT INTO reservas(
                usuario_id,
                videobeam_id,
                fecha,
                hora_inicio,
                hora_fin
            )
            VALUES(
                ?, ?, ?, ?, ?
            )
        ";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            $usuario_id,
            $videobeam_id,
            $fecha,
            $hora_inicio,
            $hora_fin
        ]);

        echo json_encode([
            "ok" => true,
            "mensaje" =>
                "Reserva registrada correctamente."
        ]);

    break;

    case 'obtener_mis_reservas':
        $usuario_id = $_SESSION['id'];

        $sql = "
            SELECT
                v.nombre AS videobeam,
                r.fecha,
                r.hora_inicio,
                r.hora_fin,
                r.estado
            FROM reservas r
            INNER JOIN videobeams v
                ON r.videobeam_id = v.id
            WHERE r.usuario_id = ?
            ORDER BY r.fecha DESC, r.hora_inicio DESC
        ";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            $usuario_id
        ]);

        echo json_encode([
            "ok" => true,
            "datos" => $stmt->fetchAll(PDO::FETCH_ASSOC)
        ]);

    break;

    default:

        echo json_encode([
            "ok" => false,
            "mensaje" => "Acción no válida."
        ]);

}