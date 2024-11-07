// Tokeny do głosowania (możesz je przechowywać w pliku JSON, ale na potrzeby skryptu używamy tego na stałe)
const validTokens = ['TOKEN123', 'TOKEN456', 'TOKEN789'];

// Obiekty kandydatów
const candidates = [
  {
    id: 'trump',
    name: 'Donald Trump',
    description: '45th President of the United States. Known for his controversial policies and charismatic personality.',
    image: 'https://www.example.com/images/trump.jpg',
    color: '#e74c3c',  // Czerwony
    votes: 0,
  },
  {
    id: 'kamala',
    name: 'Kamala Harris',
    description: 'Vice President of the United States and first female Vice President. Advocates for social justice and equality.',
    image: 'https://www.example.com/images/kamala.jpg',
    color: '#3498db',  // Niebieski
    votes: 0,
  },
];

// Funkcja do pokazania formy logowania
function showLoginForm() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('vote-form').style.display = 'none';
  document.getElementById('vote-results').style.display = 'none';
}

// Funkcja do sprawdzania tokenu
function validateToken() {
  const token = document.getElementById('token-input').value;
  if (validTokens.includes(token)) {
    localStorage.setItem('userToken', token); // Zapisujemy token w localStorage
    showVotingPage();
  } else {
    alert('Niepoprawny token! Spróbuj ponownie.');
  }
}

// Funkcja do pokazania strony głosowania
function showVotingPage() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('vote-form').style.display = 'block';
  document.getElementById('vote-results').style.display = 'none';

  const voteContainer = document.getElementById('vote-container');
  voteContainer.innerHTML = '';  // Czyścimy poprzednią listę kandydatów

  candidates.forEach(candidate => {
    const candidateCard = document.createElement('div');
    candidateCard.classList.add('vote-candidate');
    candidateCard.style.borderColor = candidate.color;

    candidateCard.innerHTML = `
      <img src="${candidate.image}" alt="${candidate.name}" />
      <h3>${candidate.name}</h3>
      <p>${candidate.description}</p>
      <button onclick="vote('${candidate.id}')">Oddaj Głos!</button>
    `;
    voteContainer.appendChild(candidateCard);
  });
}

// Funkcja do głosowania
function vote(candidateId) {
  const candidate = candidates.find(c => c.id === candidateId);
  if (candidate) {
    candidate.votes += 1;  // Zwiększamy liczbę głosów dla wybranego kandydata
    showResults();  // Po głosowaniu pokazujemy wyniki
  }
}

// Funkcja do pokazania wyników
function showResults() {
  document.getElementById('vote-form').style.display = 'none';
  document.getElementById('vote-results').style.display = 'block';

  const totalVotes = candidates.reduce((total, candidate) => total + candidate.votes, 0);

  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = '';  // Czyścimy poprzednie wyniki

  candidates.forEach(candidate => {
    const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
    const resultBar = document.createElement('div');
    resultBar.classList.add('result-bar');
    resultBar.style.backgroundColor = candidate.color;
    resultBar.style.width = `${percentage}%`;

    const resultText = document.createElement('div');
    resultText.classList.add('result-text');
    resultText.innerHTML = `
      <strong>${candidate.name}</strong>: ${candidate.votes} głosów (${percentage.toFixed(2)}%)
    `;

    const resultWrapper = document.createElement('div');
    resultWrapper.classList.add('result-wrapper');
    resultWrapper.appendChild(resultBar);
    resultWrapper.appendChild(resultText);

    resultsContainer.appendChild(resultWrapper);
  });
}

// Funkcja ukrywająca wszystkie sekcje
function hideAllSections() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('vote-form').style.display = 'none';
  document.getElementById('vote-results').style.display = 'none';
}

// Funkcja do wylogowania
function logout() {
  localStorage.removeItem('userToken');  // Usuwamy zapisany token
  showLoginForm();
}

// Sprawdzamy, czy użytkownik jest już zalogowany
window.onload = function() {
  if (localStorage.getItem('userToken')) {
    showVotingPage();
  } else {
    showLoginForm();
  }
}