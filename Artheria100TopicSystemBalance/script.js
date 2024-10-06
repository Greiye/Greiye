class Topic {
    constructor(name, type, points) {
        this.name = name;
        this.type = type;
        this.points = points; // Between 1 to 4
        this.isAbsorbed = false; // Tracks if the topic has been absorbed
    }

    // Method to handle the rolling of 1d20
    roll() {
        if (this.isAbsorbed) return;

        const roll = Math.floor(Math.random() * 20) + 1;

        if (roll === 1) {
            // If they roll a 1, they get absorbed
            this.isAbsorbed = true;
            console.log(`${this.name} is absorbed.`);
        } else if (roll === 20) {
            // If they roll a 20, they absorb another topic
            let target = topics.find(t => t !== this && !t.isAbsorbed);
            if (target) {
                target.isAbsorbed = true;
                this.points = Math.min(this.points + 1, 4); // Increase points up to a max of 4
                console.log(`${this.name} absorbs ${target.name} and gains a point.`);
            }
        } else {
            // Do nothing on a 2-19
            console.log(`${this.name} rolls a ${roll} - nothing happens.`);
        }
    }
}

// Create a list of 100 random topics
let topics = [];
const topicTypes = ['God', 'Monster', 'Magic Item', 'Valuable', 'Magical Material'];

for (let i = 0; i < 100; i++) {
    let name = `Topic ${i + 1}`;
    let type = topicTypes[Math.floor(Math.random() * topicTypes.length)];
    let points = Math.floor(Math.random() * 4) + 1; // Random points between 1 to 4
    topics.push(new Topic(name, type, points));
}

// Render the topics to the HTML page
function renderTopics() {
    const container = document.getElementById('topicContainer');
    container.innerHTML = ''; // Clear previous content

    topics.forEach(topic => {
        let topicDiv = document.createElement('div');
        topicDiv.classList.add('topic');

        if (topic.isAbsorbed) {
            topicDiv.classList.add('absorbed');
        } else if (topic.points === 4) {
            topicDiv.classList.add('strong');
        }

        topicDiv.innerHTML = `
            <h3>${topic.name}</h3>
            <p>Type: ${topic.type}</p>
            <p>Points: ${topic.points}</p>
            <p>Status: ${topic.isAbsorbed ? 'Absorbed' : 'Active'}</p>
        `;
        container.appendChild(topicDiv);
    });
}

// Handle turn (all topics roll)
function nextTurn() {
    topics.forEach(topic => {
        topic.roll();
    });
    renderTopics(); // Re-render the topics after the turn
}

// Initial render
renderTopics();

// Event listener for "Next Turn" button
document.getElementById('nextTurnButton').addEventListener('click', nextTurn);
