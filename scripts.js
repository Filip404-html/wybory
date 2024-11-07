// Przechowywanie głosów w obiekcie (można to później zmienić na zapis do pliku JSON lub bazy danych)
let votes = {
    trump: 0,
    kamala: 0
};

// Strona główna - Przekierowanie do logowania
document.getElementById('vote-btn').addEventListener('click', function() {
    window.location.href = 'login.html'; // Kieruje do strony logowania
});

document.getElementById('results-btn').addEventListener('click', function() {
    window.location.href = 'results.html'; // Kieruje do strony wyników
});

// Przycisk logowania do panelu admina - jest ukryty, ale działa na kombinację klawiszy
document.getElementById('admin-login-btn').addEventListener('click', function() {
    window.location.href = 'admin-login.html'; // Kieruje do logowania admina
});

// Formularz logowania - Weryfikacja tokenu
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let token = document.getElementById('token-input').value;

    // Sprawdzanie poprawności tokenu
    if (isValidToken(token)) {
        alert('Token poprawny! Zostaniesz przekierowany do strony głosowania.');
        window.location.href = 'vote.html'; // Jeśli token poprawny, przekierowanie do strony głosowania
    } else {
        alert('Niepoprawny token!'); // Jeśli token niepoprawny, wyświetlenie alertu
    }
});

// Funkcja sprawdzająca poprawność tokenu
function isValidToken(token) {
    const validTokens = ['abc123', 'xyz456', 'token789']; // Lista przykładowych tokenów
    return validTokens.includes(token); // Sprawdzamy, czy token jest na liście
}

// Funkcjonalność głosowania - oddanie głosu na Trumpa
document.getElementById('trump-vote-btn').addEventListener('click', function() {
    // Zwiększenie liczby głosów na Trumpa
    votes.trump++;
    alert('Głos oddany na Donalda Trumpa!');
    // Tutaj można dodać kod, który zapisuje dane do JSON lub bazy danych
    updateResults(); // Zaktualizowanie wyników głosowania
});

// Funkcjonalność głosowania - oddanie głosu na Kamalę
document.getElementById('kamala-vote-btn').addEventListener('click', function() {
    // Zwiększenie liczby głosów na Kamalę
    votes.kamala++;
    alert('Głos oddany na Kamalę Harris!');
    // Tutaj można dodać kod, który zapisuje dane do JSON lub bazy danych
    updateResults(); // Zaktualizowanie wyników głosowania
});

// Funkcja do aktualizacji wyników głosowania
function updateResults() {
    // Aktualizacja wyników na stronie (można to później przenieść do odrębnej strony)
    const trumpPercentage = (votes.trump / (votes.trump + votes.kamala)) * 100;
    const kamalaPercentage = (votes.kamala / (votes.trump + votes.kamala)) * 100;

    // Wyświetlanie wyników w konsoli (na stronie wyników będzie inny sposób wyświetlania)
    console.log(`Trump: ${trumpPercentage.toFixed(2)}%`);
    console.log(`Kamala: ${kamalaPercentage.toFixed(2)}%`);
}

// Przycisk do admina - logowanie do panelu admina
document.getElementById('admin-login-btn').addEventListener('click', function() {
    let username = prompt('Wpisz nazwę użytkownika:');
    let password = prompt('Wpisz hasło:');

    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'admin-panel.html'; // Jeśli dane logowania są poprawne, przekierowanie do panelu admina
    } else {
        alert('Niepoprawne dane logowania!');
    }
});

// Funkcja do wyświetlania wyników na stronie wyników
function showResults() {
    const trumpPercentage = (votes.trump / (votes.trump + votes.kamala)) * 100;
    const kamalaPercentage = (votes.kamala / (votes.trump + votes.kamala)) * 100;

    // Wyświetlanie wyników głosowania w dynamiczny sposób (np. pasek postępu)
    const trumpProgress = document.getElementById('trump-progress');
    const kamalaProgress = document.getElementById('kamala-progress');

    trumpProgress.style.width = `${trumpPercentage}%`;
    kamalaProgress.style.width = `${kamalaPercentage}%`;

    document.getElementById('trump-result').textContent = `Trump: ${trumpPercentage.toFixed(2)}%`;
    document.getElementById('kamala-result').textContent = `Kamala: ${kamalaPercentage.toFixed(2)}%`;
}

// Wywołanie funkcji do wyświetlania wyników głosowania na stronie wyników
if (window.location.pathname.includes('results.html')) {
    showResults();
}