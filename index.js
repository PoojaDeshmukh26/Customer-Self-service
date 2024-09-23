let claims = [];

document.getElementById('claimForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const policyNumber = document.getElementById('policyNumber').value;
    const incidentDate = document.getElementById('incidentDate').value;
    const incidentDescription = document.getElementById('incidentDescription').value;

    const newClaim = {
        claimNumber: 'CLM' + (claims.length + 1).toString().padStart(3, '0'),
        status: 'In Review',
        dateSubmitted: new Date().toLocaleDateString(),
        policyNumber,
        incidentDate,
        incidentDescription
    };

    claims.push(newClaim);
    document.getElementById('submitMessage').innerText = 'Claim submitted successfully!';
    document.getElementById('claimForm').reset();
    renderClaims();
});

function renderClaims() {
    const claimsTableBody = document.getElementById('claimsTableBody');
    claimsTableBody.innerHTML = '';
    claims.forEach(claim => {
        const row = `<tr>
            <td>${claim.claimNumber}</td>
            <td>${claim.status}</td>
            <td>${claim.dateSubmitted}</td>
        </tr>`;
        claimsTableBody.innerHTML += row;
    });
}

function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

function sendChat() {
    const chatInput = document.getElementById('chatInput').value;
    if (!chatInput) return;

    const chatOutput = document.getElementById('chatOutput');
    chatOutput.innerHTML += `<div>User: ${chatInput}</div>`;
    document.getElementById('chatInput').value = '';

    // Simulate chatbot response
    setTimeout(() => {
        const botResponse = `Chatbot: ${getChatbotResponse(chatInput)}`;
        chatOutput.innerHTML += `<div>${botResponse}</div>`;
        chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to bottom
    }, 500);
}

function getChatbotResponse(query) {
    // Placeholder for actual Dialogflow integration
    return "I'm here to help with your inquiries!";
}

// Search Knowledge Base (mock data)
const articles = [
    { title: "How to File a Claim", content: "Steps to file a claim..." },
    { title: "Understanding Your Policy", content: "Information about your policy..." },
    { title: "Common Questions", content: "Answers to common questions..." },
];

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const results = articles.filter(article => article.title.toLowerCase().includes(query));
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = results.map(article => `<h3>${article.title}</h3><p>${article.content}</p>`).join('');
});
