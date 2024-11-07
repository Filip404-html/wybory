// Funkcja do logowania do panelu admina
function adminLogin() {
    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;

    const correctUsername = "admin";  // Przykładowa nazwa użytkownika
    const correctPassword = "haslo123";  // Przykładowe hasło

    if (username === correctUsername && password === correctPassword) {
        // Jeśli dane logowania są poprawne, przekierowanie do panelu admina
        window.location.href = "admin-panel.html";
    } else {
        // Wyświetlanie komunikatu o błędzie, jeśli dane są niepoprawne
        document.getElementById("error-message").style.display = "block";
    }
}

// Funkcja do odsłonięcia ukrytego przycisku logowania
function revealLoginButton() {
    const secretCode = 'adminsecret'; // Sekretny kod, który użytkownik musi wpisać, aby odsłonić przycisk
    let inputCode = prompt("Wprowadź sekretny kod dostępu:");
    
    if (inputCode === secretCode) {
        document.getElementById("login-btn").style.display = "inline-block"; // Pokazujemy przycisk
        alert("Przycisk logowania został odsłonięty. Możesz się zalogować.");
    } else {
        alert("Niepoprawny kod.");
    }
}

// Wykorzystaj kombinację klawiszy, aby odsłonić przycisk logowania
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'L') { // Kombinacja Ctrl + Shift + L
        revealLoginButton();
    }
});

// Funkcja generująca token
function generateToken() {
    const token = Math.random().toString(36).substring(2, 12);  // Przykładowy token
    alert("Wygenerowany token: " + token);
}

// Funkcja wyświetlająca wyniki głosowania
function viewResults() {
    // Przykład wyświetlania wyników - w prawdziwej aplikacji dane będą pochodzić z bazy danych lub pliku
    window.location.href = "results.html";
}

// Funkcja generująca PDF (na razie przykładowa funkcjonalność)
function generatePDF() {
    alert("Generowanie pliku PDF...");
}