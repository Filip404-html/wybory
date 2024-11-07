let trumpVotes = 0;
let kamalaVotes = 0;

const tokens = [];
const results = { Trump: 0, Kamala: 0 };

function validateToken() {
    const token = document.getElementById("token-input").value;
    fetch('tokens.json')
        .then(response => response.json())
        .then(data => {
            const validToken = data.find(t => t.token === token && !t.used);
            if (validToken) {
                validToken.used = true;
                alert('Token zatwierdzony!');
                localStorage.setItem('user-token', token);
                window.location.href = "vote.html";
            } else {
                document.getElementById("error-message").classList.remove("hidden");
            }
        });
}

function vote(candidate) {
    if (candidate === 'Trump') {
        trumpVotes++;
        document.getElementById('trump-votes').innerText = trumpVotes;
    } else if (candidate === 'Kamala') {
        kamalaVotes++;
        document.getElementById('kamala-votes').innerText = kamalaVotes;
    }
    alert('Dziękujemy za głos!');
}

function loginAdmin() {
    const password = document.getElementById('admin-password').value;
    if (password === "admin123") {
        window.location.href = "admin-panel.html";
    } else {
        document.getElementById("admin-error-message").classList.remove("hidden");
    }
}

function generateToken() {
    const newToken = { token: Math.random().toString(36).substr(2, 