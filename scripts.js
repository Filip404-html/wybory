// Wstępna definicja tokenów (można przechowywać w pliku JSON, lokalnie w aplikacji)
let tokens = [
  { token: "abc123", used: true },
  { token: "def456", used: true },
  { token: "ghi789", used: false }
];

// Kto głosował i na kogo
let votes = {
  Trump: 0,
  Kamala: 0
};

// Funkcja do ukrywania/wyświetlania formularza logowania
function toggleAdminLogin() {
  const loginForm = document.getElementById("admin-login-form");
  loginForm.style.display = loginForm.style.display === "block" ? "none" : "block";
}

// Funkcja sprawdzająca poprawność tokenu
function verifyToken() {
  const tokenInput = document.getElementById("token-input").value;
  const token = tokens.find(t => t.token === tokenInput && !t.used);

  if (token) {
    // Jeśli token poprawny i nieużywany
    token.used = true;
    alert("Token zweryfikowany. Możesz oddać głos!");
    window.location.href = "vote.html";  // Przekierowanie do strony głosowania
  } else {
    alert("Niepoprawny token lub już użyty!");
  }
}

// Funkcja głosowania
function voteForCandidate(candidate) {
  if (candidate === "Trump") {
    votes.Trump++;
    updateVoteResults();
  } else if (candidate === "Kamala") {
    votes.Kamala++;
    updateVoteResults();
  }
}

// Funkcja aktualizująca wyniki głosowania
function updateVoteResults() {
  const totalVotes = votes.Trump + votes.Kamala;
  const trumpPercent = (votes.Trump / totalVotes) * 100 || 0;
  const kamalaPercent = (votes.Kamala / totalVotes) * 100 || 0;

  // Zaktualizowanie pasków postępu
  document.getElementById("trump-progress").style.width = `${trumpPercent}%`;
  document.getElementById("kamala-progress").style.width = `${kamalaPercent}%`;

  // Zaktualizowanie tekstów na paskach
  document.getElementById("trump-progress-text").innerText = `${Math.round(trumpPercent)}%`;
  document.getElementById("kamala-progress-text").innerText = `${Math.round(kamalaPercent)}%`;

  // Wyświetlenie końcowych wyników w procentach
  document.getElementById("trump-votes").innerText = `Trump: ${votes.Trump} głosów`;
  document.getElementById("kamala-votes").innerText = `Kamala: ${votes.Kamala} głosów`;
}

// Funkcja pokazująca wyniki głosowania
function showResults() {
  document.getElementById("results-container").style.display = "block";
}

// Funkcja do generowania tokenów dla admina
function generateTokens() {
  let newToken = generateRandomToken();
  tokens.push({ token: newToken, used: false });
  alert(`Nowy token: ${newToken}`);
}

// Funkcja do generowania losowego tokenu
function generateRandomToken() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 6; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

// Funkcja logowania admina (opcjonalnie ukryta)
function adminLogin() {
  const adminPassword = prompt("Wpisz hasło do panelu admina:");
  if (adminPassword === "admin123") {
    window.location.href = "admin-panel.html";  // Przekierowanie do panelu admina
  } else {
    alert("Niepoprawne hasło!");
  }
}

// Funkcja uruchamiająca wszystkie eventy po załadowaniu strony
window.onload = function () {
  // Funkcja uruchamiająca przycisk "Pokaż wyniki"
  const resultsBtn = document.getElementById("results-btn");
  resultsBtn.addEventListener("click", showResults);

  // Przycisk logowania admina (po kombinacji przycisków)
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.altKey && event.key === "L") {
      adminLogin();
    }
  });
};

// Lista poprawnych tokenów (można załadować z serwera, pliku JSON itp.)
const validTokens = ['12345', '67890']; // Przykładowe poprawne tokeny

// Obsługuje formularz logowania na tokenach
const tokenForm = document.getElementById('token-form');
const tokenInput = document.getElementById('token-input');

// Funkcja, która sprawdza poprawność tokenu
tokenForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const token = tokenInput.value.trim();
  
  // Jeśli token jest poprawny, przekieruj do strony głosowania
  if (validTokens.includes(token)) {
    window.location.href = 'vote.html';  // Przekierowanie do strony głosowania
  } else {
    alert('Token jest nieprawidłowy. Spróbuj ponownie.');
  }

  // Wyczyść pole tokenu po próbie
  tokenInput.value = '';
});

// Przykładowe dane głosów
const results = {
  trumpVotes: 1200,
  kamalaVotes: 850
};

// Funkcja do aktualizacji wyników
function updateResults() {
  const trumpVotes = document.getElementById('trump-votes');
  const kamalaVotes = document.getElementById('kamala-votes');
  
  const trumpBar = document.getElementById('trump-bar');
  const kamalaBar = document.getElementById('kamala-bar');

  // Ustawienie liczby głosów
  trumpVotes.textContent = results.trumpVotes;
  kamalaVotes.textContent = results.kamalaVotes;

  // Obliczanie maksymalnej liczby głosów (aby skala była zawsze spójna)
  const maxVotes = Math.max(results.trumpVotes, results.kamalaVotes);

  // Ustawianie wysokości słupków na podstawie liczby głosów
  trumpBar.style.height = `${(results.trumpVotes / maxVotes) * 300}px`; // Skala 300px
  kamalaBar.style.height = `${(results.kamalaVotes / maxVotes) * 300}px`; // Skala 300px
}

// Wywołanie funkcji na załadowanie strony
window.onload = updateResults;