// Funkcja logowania do panelu admina
function adminLogin() {
    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;

    // Weryfikacja admina - przykładowe dane
    if (username === "admin" && password === "admin123") {
        window.location.href = "admin-panel.html";
    } else {
        alert("Błędne dane logowania!");
    }
}

// Funkcja generowania tokenu
function generateToken() {
    const token = Math.random().toString(36).substring(2, 15); // Generuje losowy token
    alert("Wygenerowany token: " + token);

    // Można dodać kod do zapisania tego tokenu w pliku lub bazie danych
}

// Funkcja pobierania wyników w formacie PDF
function downloadResultsPDF() {
    const { jsPDF } = window.jspdf;

    // Pobieramy dane głosów z localStorage (jeśli są dostępne)
    const votes = JSON.parse(localStorage.getItem("votes")) || { Trump: 0, Kamala: 0 };

    const doc = new jsPDF();

    doc.text("Wyniki Głosowania", 20, 20);
    doc.text(`Donald Trump: ${votes.Trump} głosów`, 20, 40);
    doc.text(`Kamala Harris: ${votes.Kamala} głosów`, 20, 50);

    doc.save("wyniki_glosowania.pdf");
}

// Funkcja do wyświetlania wyników w panelu admina
function displayAdminResults() {
    const votes = JSON.parse(localStorage.getItem("votes")) || { Trump: 0, Kamala: 0 };

    document.getElementById("admin-trump-votes").textContent = votes.Trump;
    document.getElementById("admin-kamala-votes").textContent = votes.Kamala;
}

// Wywołaj tę funkcję na stronie admin-panel.html, aby załadować wyniki
window.onload = displayAdminResults;