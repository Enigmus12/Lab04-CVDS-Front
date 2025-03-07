document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/booking-service/bookings")  
        .then(response => response.json())
        .then(data => mostrarReservas(data))
        .catch(error => console.error("Error obteniendo reservas:", error));
});

function mostrarReservas(bookings) {
    const lista = document.getElementById("listaReservas");
    lista.innerHTML = "";  

    if (bookings.length === 0) {
        const item = document.createElement("option");
        item.textContent = "No hay reservas disponibles";
        lista.appendChild(item);
        lista.disabled = true; // ❌ DESHABILITA SI NO HAY RESERVAS
    } else {
        lista.disabled = false; // ✅ HABILITA EL SELECT SI HAY RESERVAS
        bookings.forEach(booking => {
            const item = document.createElement("option");
            item.value = booking.bookingId;
            item.textContent = `ID: ${booking.bookingId} | Aula: ${booking.bookingClassRoom}`;
            lista.appendChild(item);
        });
    }
}
