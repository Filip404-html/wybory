// Przykładowe dane głosów (można je zmienić lub pobrać z pliku JSON lub API)
const results = {
  trumpVotes: 1200,   // Liczba głosów oddanych na Trumpa
  kamalaVotes: 850    // Liczba głosów oddanych na Kamalę
};

// Funkcja do aktualizacji wyników na stronie
function updateResults() {
  const trumpVotesElement = document.getElementById('trump-votes');
  const kamalaVotesElement = document.getElementById('kamala-votes');
  
  const trumpBar = document.getElementById('trump-bar');
  const kamalaBar = document.getElementById('kamala-bar');

  // Ustawienie liczby głosów dla każdego kandydata
  trumpVotesElement.textContent = results.trumpVotes;
  kamalaVotesElement.textContent = results.kamalaVotes;

  // Obliczanie maksymalnej liczby głosów, aby zachować proporcje
  const maxVotes = Math.max(results.trumpVotes, results.kamalaVotes);

  // Obliczanie wysokości słupków na podstawie głosów
  trumpBar.style.height = `${(results.trumpVotes / maxVotes) * 300}px`; // Skala wysokości = 300px
  kamalaBar.style.height = `${(results.kamalaVotes / maxVotes) * 300}px`; // Skala wysokości = 300px
}

// Funkcja do obsługi logowania (sprawdza token i przekierowuje do strony do głosowania)
function login() {
  const tokenInput = document.getElementById('token-input').value;
  const correctToken = "valid-token"; // Wstaw tutaj prawidłowy token

  if (tokenInput === correctToken) {
    window.location.href = "vote.html";  // Przekierowanie na stronę do głosowania
  } else {
    alert("Niepoprawny token. Spróbuj ponownie.");
  }
}

// Funkcja do obsługi głosowania
function vote(candidate) {
  // Zaktualizowanie głosów na podstawie głosowania
  if (candidate === "trump") {
    results.trumpVotes++;
  } else if (candidate === "kamala") {
    results.kamalaVotes++;
  }

  // Zaktualizowanie wyników
  updateResults();
  alert(`Dziękujemy za oddanie głosu na ${candidate === "trump" ? "Trumpa" : "Kamala"}`);
}

// Funkcja do obsługi generowania tokenów
function generateToken() {
  // Generowanie losowego tokenu
  const token = Math.random().toString(36).substring(2, 15);
  alert(`Wygenerowano token: ${token}`);
  return token;
}

// Funkcja do inicjalizacji strony (np. ładowanie wyników, czy sprawdzenie, czy użytkownik jest zalogowany)
window.onload = function() {
  updateResults(); // Ładowanie wyników przy starcie strony
}