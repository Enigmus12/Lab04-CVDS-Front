document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/booking-service/bookings")
        .then(response => response.json())
        .then(data => mostrarHorarios(data))
        .catch(error => console.error("Error obteniendo reservas:", error));

        //botton back
        document.getElementById("backBtn").addEventListener("click", function() {
            window.location.href = "../../index.html";
        });
});

function mostrarHorarios(bookings) {
    const contenedor = document.getElementById("contenedorHorarios");
    contenedor.innerHTML = "";

    if (bookings.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay horarios disponibles";
        contenedor.appendChild(mensaje);
    } else {
        bookings.forEach(booking => {
            const horario = document.createElement("div");
            horario.classList.add("horario-box");
            horario.innerHTML = `
            <p><strong>ID:</strong> ${booking.bookingId}</p>
            <p><strong>Fecha:</strong> ${booking.bookingDate}</p>
            <p><strong>Hora:</strong> ${booking.bookingTime}</p>
            <p><strong>Aula:</strong> ${booking.bookingClassRoom}</p>
            <p><strong>Disponible:</strong> ${booking.disable}</p>
        `;
            contenedor.appendChild(horario);
        });
    }
}