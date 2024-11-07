// Funkcja logowania
function login() {
    const token = document.getElementById("token").value;
    
    if (token === "SECRET_TOKEN") { // Prosty token dla demonstracji
        localStorage.setItem("isLoggedIn", "true");
        alert("Zalogowano pomyślnie!");
        window.location.href = "vote.html";
    } else {
        alert("Nieprawidłowy token!");
    }
}

// Funkcja głosowania
function castVote(candidate) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        alert("Musisz się zalogować, aby zagłosować.");
        return;
    }

    let trumpVotes = parseInt(localStorage.getItem("trumpVotes")) || 0;
    let kamalaVotes = parseInt(localStorage.getItem("kamalaVotes")) || 0;

    if (candidate === "Trump") {
        trumpVotes++;
        localStorage.setItem("trumpVotes", trumpVotes);
    } else if (candidate === "Kamala") {
        kamalaVotes++;
        localStorage.setItem("kamalaVotes", kamalaVotes);
    }

    alert(`Dziękujemy za głos na ${candidate}!`);
    localStorage.setItem("isLoggedIn", "false"); // Blokuje ponowne głosowanie po jednym głosie
    window.location.href = "results.html";
}

// Funkcja wyświetlania wyników z animacjami
function displayResults() {
    const trumpVotes = parseInt(localStorage.getItem("trumpVotes")) || 0;
    const kamalaVotes = parseInt(localStorage.getItem("kamalaVotes")) || 0;
    const totalVotes = trumpVotes + kamalaVotes;
    
    const trumpPercentage = totalVotes === 0 ? 0 : Math.round((trumpVotes / totalVotes) * 100);
    const kamalaPercentage = totalVotes === 0 ? 0 : Math.round((kamalaVotes / totalVotes) * 100);
    
    // Ustawienie szerokości pasków
    const trumpBar = document.getElementById("trump-bar");
    const kamalaBar = document.getElementById("kamala-bar");
    
    const trumpLabel = document.getElementById("trump-label");
    const kamalaLabel = document.getElementById("kamala-label");
    
    trumpBar.style.width = `${trumpPercentage}%`;
    kamalaBar.style.width = `${kamalaPercentage}%`;
    
    trumpLabel.textContent = `Trump - ${trumpVotes} głosów`;
    kamalaLabel.textContent = `Kamala - ${kamalaVotes} głosów`;
    
    document.getElementById("trump-percentage").textContent = `Trump: ${trumpPercentage}%`;
    document.getElementById("kamala-percentage").textContent = `Kamala: ${kamalaPercentage}%`;
}

window.onload = displayResults;
