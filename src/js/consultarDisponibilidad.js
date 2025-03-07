document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/booking-service/bookings")
        .then(response => response.json())
        .then(data => mostrarReservas(data))
        .catch(error => console.error("Error obteniendo reservas:", error));
});

function mostrarReservas(bookings) {
    const lista = document.getElementById("listaReservas");
    const reservarBtn = document.getElementById("reservarBtn");

    lista.innerHTML = "";  
    reservarBtn.disabled = true;  

    if (bookings.length === 0) {
        const item = document.createElement("option");
        item.textContent = "No hay reservas disponibles";
        lista.appendChild(item);
        lista.disabled = true;
    } else {
        lista.disabled = false;
        bookings.forEach(booking => {
            const item = document.createElement("option");
            item.value = booking.bookingId;
            item.textContent = `ID: ${booking.bookingId} | Aula: ${booking.bookingClassRoom}`;
            lista.appendChild(item);
        });

        lista.addEventListener("change", function () {
            reservarBtn.disabled = !lista.value;  
        });
    }
}

function reservar() {
    const bookingId = document.getElementById("listaReservas").value;
    if (!bookingId) return alert("Selecciona una reserva antes de continuar.");
    fetch(`http://localhost:8080/booking-service/bookings/make/${bookingId}`, { method: "PUT" })
        .then(response => response.ok ? response.json() : Promise.reject("Ya esta reservado este lab"))
        .then(() => alert("Reserva realizada con éxito."))
        .catch(error => alert(error));
}
