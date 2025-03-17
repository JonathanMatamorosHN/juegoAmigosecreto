const participantNameInput = document.getElementById('participantName');
const addParticipantButton = document.getElementById('addParticipant');
const participantList = document.getElementById('participantList');
const startDrawButton = document.getElementById('startDraw');
const resultsDiv = document.getElementById('results');

let participants = [];

addParticipantButton.addEventListener('click', () => {
    const name = participantNameInput.value.trim();
    if (name) {
        participants.push(name);
        const listItem = document.createElement('li');
        listItem.textContent = name;
        participantList.appendChild(listItem);
        participantNameInput.value = '';
    }
});

startDrawButton.addEventListener('click', () => {
    if (participants.length < 2) {
        alert('Agrega al menos dos participantes.');
        return;
    }

    const shuffledParticipants = shuffleArray([...participants]);
    const assignments = {};

    for (let i = 0; i < shuffledParticipants.length; i++) {
        const giver = shuffledParticipants[i];
        const receiver = shuffledParticipants[(i + 1) % shuffledParticipants.length];
        assignments[giver] = receiver;
    }

    displayResults(assignments);
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayResults(assignments) {
    resultsDiv.innerHTML = '';
    for (const giver in assignments) {
        const result = document.createElement('p');
        result.textContent = `${giver} le regala a ${assignments[giver]}`;
        resultsDiv.appendChild(result);
    }
}