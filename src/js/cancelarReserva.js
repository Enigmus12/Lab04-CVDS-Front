document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/bookings")  // Ajusta la URL si es diferente
        .then(response => response.json())
        .then(data => mostrarLaboratorios(data))
        .catch(error => console.error("Error obteniendo laboratorios:", error));
});

function mostrarLaboratorios(bookings) {
    const lista = document.getElementById("listaLaboratorios");
    lista.innerHTML = "";  

    if (bookings.length === 0) {
        const item = document.createElement("option");
        item.textContent = "No hay laboratorios disponibles";
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
