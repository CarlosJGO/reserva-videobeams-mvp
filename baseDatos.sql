CREATE DATABASE reserva_videobeams;

USE reserva_videobeams;

-- Tabla usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('usuario', 'administrador') NOT NULL
);

-- Tabla videobeams
CREATE TABLE videobeams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado ENUM('disponible', 'prestado') DEFAULT 'disponible'
);

-- Tabla reservas
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    videobeam_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado ENUM(
        'pendiente',
        'aprobada',
        'rechazada',
        'entregado',
        'devuelto'
    ) DEFAULT 'pendiente',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (videobeam_id) REFERENCES videobeams(id)
);

-- Datos iniciales: usuarios
INSERT INTO usuarios (nombre, correo, password, rol)
VALUES
(
    'Administrador',
    'admin@uniguajira.edu.co',
    '123456',
    'administrador'
),
(
    'Carlos Gomez',
    'carlos@uniguajira.edu.co',
    '123456',
    'usuario'
),
(
    'Maria Perez',
    'maria@uniguajira.edu.co',
    '123456',
    'usuario'
);

-- Datos iniciales: videobeams
INSERT INTO videobeams (nombre, descripcion)
VALUES
(
    'Epson EB-W05',
    'Videobeam blanco resolución WXGA'
),
(
    'BenQ MH535',
    'Videobeam negro HDMI'
),
(
    'Sony VPL EX430',
    'Videobeam gris alta luminosidad'
),
(
    'Optoma X500',
    'Videobeam negro 3500 lúmenes'
);