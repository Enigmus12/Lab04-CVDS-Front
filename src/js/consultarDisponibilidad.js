document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/booking-service/bookings")
        .then(response => response.json())
        .then(data => mostrarReservas(data))
        .catch(error => console.error("Error obteniendo reservas:", error));
});

function mostrarReservas(bookings) {
    const lista = document.getElementById("listaReservas");
    const estadoBtn = document.getElementById("confirmarAccionBtn"); 

    lista.innerHTML = "";  
    estadoBtn.textContent = "Verificar disponibilidad";
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

function verificarEstado() {
    const lista = document.getElementById("listaReservas");
    const bookingId = lista.value;
    const estadoLab = document.getElementById("estadoLab");

    fetch(`http://localhost:8080/booking-service/bookings/${bookingId}`)
        .then(response => response.json())
        .then(booking => {
            if (!   booking.disable) {  
                estadoLab.textContent = "❌ El laboratorio NO está disponible.";
                estadoLab.style.color = "red";
            } else {
                estadoLab.textContent = "✅ El laboratorio está DISPONIBLE.";
                estadoLab.style.color = "green";
            }
        })
        .catch(error => {
            console.error("Error obteniendo el estado:", error);
            estadoLab.textContent = "⚠️ Error al obtener el estado.";
            estadoLab.style.color = "orange";
        });
}
