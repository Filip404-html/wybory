// Funkcja do pobrania wyników głosowania z lokalnego storage
function getVotes() {
    const votes = JSON.parse(localStorage.getItem('votes')) || { "Trump": 0, "Kamala": 0 };
    return votes;
}

// Funkcja do wyświetlenia wyników na stronie wyników
function displayVotes() {
    const votes = getVotes();
    document.getElementById('trumpVotes').innerText = `Trump: ${votes.Trump}`;
    document.getElementById('kamalaVotes').innerText = `Kamala: ${votes.Kamala}`;
    // Dla panelu admina
    document.getElementById('adminTrumpVotes').innerText = votes.Trump;
    document.getElementById('adminKamalaVotes').innerText = votes.Kamala;
}

// Funkcja do głosowania
function vote(candidate) {
    const votes = getVotes();
    votes[candidate]++;
    localStorage.setItem('votes', JSON.stringify(votes));  // Zapis głosów do localStorage
    displayVotes();  // Odświeżenie wyników
}

// Funkcja do logowania (dla admina)
function login() {
    const password = document.getElementById('password').value;
    const correctPassword = "admin123";  // Hasło dla admina

    if (password === correctPassword) {
        alert("Zalogowano pomyślnie");
        location.href = "admin-panel.html";
    } else {
        alert("Nieprawidłowe hasło.");
    }
}

// Inicjalizacja wyników przy załadowaniu strony
window.onload = function() {
    displayVotes();
};