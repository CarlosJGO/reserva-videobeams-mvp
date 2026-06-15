document.addEventListener("DOMContentLoaded", () => {

    fetch("obtener_videobeams.php")
        .then(response => response.json())
        .then(data => {

            const tbody = document.querySelector("#tablaVideobeams tbody");

            data.forEach(videobeam => {

                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${videobeam.id}</td>
                    <td>${videobeam.nombre}</td>
                    <td>${videobeam.descripcion}</td>
                    <td class="${videobeam.estado}">
                        ${videobeam.estado}
                    </td>
                `;

                tbody.appendChild(fila);
            });

        });

});