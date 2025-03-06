document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/bookings")  
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
        lista.disabled = true;
    } else {
        lista.disabled = false;
        bookings.forEach(booking => {
            const item = document.createElement("option");
            item.value = booking.id;
            item.textContent = `ID: ${booking.id} | Booking: ${booking.bookingId}`;
            lista.appendChild(item);
        });
    }
}
