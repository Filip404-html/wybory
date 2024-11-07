// Funkcja logowania za pomocą tokenu
function login() {
    const token = document.getElementById("token").value;
    if (token === "12345") { // Przykładowy token
        window.location.href = "vote.html";
    } else {
        alert("Błędny token!");
    }
}

// Funkcja oddania głosu
function castVote(candidate) {
    let votes = JSON.parse(localStorage.getItem("votes")) || { Trump: 0, Kamala: 0 };

    if (candidate === 'Trump') {
        votes.Trump += 1;
    } else if (candidate === 'Kamala') {
        votes.Kamala += 1;
    }

    localStorage.setItem("votes", JSON.stringify(votes));

    // Przekierowanie na stronę wyników
    window.location.href = "results.html";
}

// Wyświetlanie wyników głosowania
function displayResults() {
    const votes = JSON.parse(localStorage.getItem("votes")) || { Trump: 0, Kamala: 0 };
    const totalVotes = votes.Trump + votes.Kamala;

    const trumpPercentage = (votes.Trump / totalVotes) * 100 || 0;
    const kamalaPercentage = (votes.Kamala / totalVotes) * 100 || 0;

    // Ustawienie szerokości paska
    const trumpBar = document.getElementById("trump-bar");
    const kamalaBar = document.getElementById("kamala-bar");

    const trumpLabel = document.getElementById("trump-label");
    const kamalaLabel = document.getElementById("kamala-label");

    trumpBar.style.width = `${trumpPercentage}%`;
    kamalaBar.style.width = `${kamalaPercentage}%`;

    trumpLabel.textContent = `Trump - ${votes.Trump} głosów`;
    kamalaLabel.textContent = `Kamala - ${votes.Kamala} głosów`;

    document.getElementById("trump-percentage").textContent = `Trump: ${trumpPercentage.toFixed(2)}%`;
    document.getElementById("kamala-percentage").textContent = `Kamala: ${kamalaPercentage.toFixed(2)}%`;
}

window.onload = displayResults;