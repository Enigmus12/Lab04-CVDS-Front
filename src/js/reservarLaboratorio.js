document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/booking-service/bookings")
        .then(response => response.json())
        .then(data => mostrarReservas(data))
        .catch(error => console.error("Error obteniendo reservas:", error));
        //botton back
        document.getElementById("backBtn").addEventListener("click", function() {
            window.location.href = "../../index.html";
        });
});

function mostrarReservas(bookings) {
    const lista = document.getElementById("listaReservas");
    const estadoBtn = document.getElementById("confirmarAccionBtn"); 

    lista.innerHTML = "";  
    estadoBtn.disabled = false;  

    if (bookings.length === 0) {
        const item = document.createElement("option");
        item.textContent = "No hay laboratorios disponibles";
        lista.appendChild(item);
        lista.disabled = true;
        estadoBtn.disabled = true;
    } else {
        lista.disabled = false;
        bookings.forEach(booking => {
            const item = document.createElement("option");
            item.value = booking.bookingId;
            item.textContent = `ID: ${booking.bookingId} | Aula: ${booking.bookingClassRoom}`;
            lista.appendChild(item);
        });
    }

    estadoBtn.addEventListener("click", verificarEstado);
}

function reservar() {
    const lista = document.getElementById("listaReservas");
    const estadoLab = document.getElementById("estadoLab");
    const bookingId = lista.value;

    fetch(`http://localhost:8080/booking-service/bookings/make/${bookingId}`, { method: "PUT" })
        .then(response => response.ok ? response.json() : Promise.reject("❌ Ya está reservado este laboratorio."))
        .then(() => {
            estadoLab.textContent = "✅ Reserva realizada con éxito.";
            estadoLab.style.color = "green";
        })
        .catch(error => {
            estadoLab.textContent = error;
            estadoLab.style.color = "red";
        });
}

