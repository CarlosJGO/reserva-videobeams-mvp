# Sistema de Reserva de Videobeams - MVP

Proyecto desarrollado para la asignatura **Procesos Ágiles de Desarrollo de Software**, aplicando la metodología Scrum y utilizando tecnologías web.

---

## Descripción

El sistema permite gestionar la reserva de videobeams dentro de la universidad mediante una aplicación web.

Los usuarios pueden consultar la disponibilidad de los equipos y realizar solicitudes de reserva, mientras que los administradores pueden aprobar o rechazar dichas solicitudes, además de gestionar la entrega y devolución de los equipos.

Este proyecto corresponde a un **Producto Mínimo Viable (MVP)**, enfocado en resolver una necesidad real de manera simple y funcional.

---

# Tecnologías Utilizadas

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- PHP

### Base de Datos

- MySQL

### Entorno de Desarrollo

- XAMPP

### Control de Versiones

- Git
- GitHub

### Gestión Ágil

- Trello

---

# Estructura del Proyecto

```text
reserva-videobeams

├── assets/
│   ├── css/
│   ├── js/
│   └── img/
│
├── config/
│   └── conexion.php
│
├── controllers/
│
├── models/
│
├── views/
│   ├── login.php
│   ├── dashboard_usuario.php
│   ├── nueva_reserva.php
│   ├── mis_reservas.php
│   ├── dashboard_admin.php
│   ├── solicitudes.php
│   ├── entregas.php
│   └── devoluciones.php
│
├── database/
│   └── reserva_videobeams.sql
│
├── .gitignore
│
├── README.md
│
└── index.php
```

---

# Roles del Sistema

## Usuario

Puede:

- Iniciar sesión.
- Consultar videobeams disponibles.
- Solicitar reserva.
- Consultar el estado de sus reservas.

---

## Administrador

Puede:

- Iniciar sesión.
- Visualizar solicitudes pendientes.
- Aprobar solicitudes.
- Rechazar solicitudes.
- Registrar entrega del equipo.
- Registrar devolución del equipo.

---

# Base de Datos

El sistema utiliza las siguientes tablas:

- usuarios
- videobeams
- reservas

---

# Flujo del Sistema

```text
LOGIN

│

├── Usuario

│

├── Dashboard

├── Nueva Reserva

└── Mis Reservas

│

└── Administrador

│

├── Dashboard

├── Solicitudes

├── Entregas

└── Devoluciones
```

---

# Historias de Usuario

- HU-01 Consultar videobeams disponibles.
- HU-02 Solicitar reserva.
- HU-03 Consultar estado de reserva.
- HU-04 Visualizar solicitudes pendientes.
- HU-05 Aprobar solicitud.
- HU-06 Rechazar solicitud.
- HU-07 Registrar entrega.
- HU-08 Registrar devolución.

---

# Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/CarlosJGO/reserva-videobeams-mvp.git
```

2. Copiar la carpeta del proyecto dentro de:

```text
xampp/htdocs/
```

3. Iniciar desde XAMPP:

- Apache
- MySQL

4. Crear la base de datos:

```text
reserva_videobeams
```

5. Importar:

```text
database/reserva_videobeams.sql
```

6. Abrir el navegador:

```text
http://localhost/reserva-videobeams
```

---

# Asignatura

**Procesos Ágiles de Desarrollo de Software**

Proyecto Final:

**Agile Forge: De la Idea al Valor Real**

---

# 👨‍💻 Equipo de Desarrollo

- Persona 1 - Login y Dashboard Usuario.
- Persona 2 - Reservas e Integración.
- Persona 3 - Administración y Solicitudes.
- Persona 4 - Entregas y Devoluciones.
