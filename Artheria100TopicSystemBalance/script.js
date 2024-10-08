let entities = [];
let lorebook = [];
let year = 0;
const maxPoints = 4;
const totalPoints = 100;
const lifespan = 100; // lifespan of 100 years

function generateRandomEntity(id) {
    const races = ['Human', 'Elf', 'Dwarf'];
    const objects = ['Sword', 'Shield', 'Gauntlet', 'Ring', 'Amulet'];
    const race = races[Math.floor(Math.random() * races.length)];
    const object = objects[Math.floor(Math.random() * objects.length)];
    const points = Math.floor(Math.random() * maxPoints) + 1; // Random points between 1 and 4
    return { id, name: `${object} of ${race}`, points, age: 0, absorbed: false };
}

function renderEntity(entity) {
    return `<tr>
        <td>${entity.name}</td>
        <td>${entity.id}</td>
        <td>${entity.points}</td>
        <td>${entity.age}</td>
    </tr>`;
}

function renderEntities() {
    const entityContainer = document.getElementById('entityContainer').getElementsByTagName('tbody')[0];
    entityContainer.innerHTML = entities
        .filter(entity => !entity.absorbed) // Only show non-absorbed entities
        .map(renderEntity)
        .join('');
}

function renderLorebook() {
    const lorebookContainer = document.getElementById('lorebookContainer').getElementsByTagName('tbody')[0];
    lorebookContainer.innerHTML = lorebook
        .map(entry => `<tr>
            <td>${entry.name}</td>
            <td>${entry.id}</td>
            <td>${entry.reason}</td>
        </tr>`)
        .join('');
}

function ensureConservation() {
    const total = entities.reduce((sum, entity) => sum + entity.points, 0);
    let message = '';

    if (total > totalPoints) {
        // Reduce points from the largest entity
        const largestEntity = entities.reduce((max, entity) => entity.points > max.points ? entity : max, entities[0]);
        largestEntity.points--;
        message = `${largestEntity.name} (Entity ${largestEntity.id}) lost 1 point to maintain balance.`;
    } else if (total < totalPoints) {
        // Create a new entity to maintain 100 points
        if (entities.length < 50) { // Maximum number of entities
            const newId = entities.length + 1;
            const newEntity = generateRandomEntity(newId);
            newEntity.points = totalPoints - total; // Assign points needed to balance
            entities.push(newEntity);
            message = `A new entity (${newEntity.name}, Entity ${newEntity.id}) was created to maintain balance.`;
        }
    }
    return message;
}

function nextYear() {
    year++;
    document.getElementById('turnTracker').innerText = `Year: ${year}`;

    // Increment age and check for deletions
    entities.forEach(entity => {
        entity.age++;
        if (entity.age >= lifespan) {
            const reason = `Forgotten to time.`;
            lorebook.push({ name: entity.name, id: entity.id, reason });
            entities = entities.filter(e => e.id !== entity.id);
        }
    });

    const conservationMessage = ensureConservation();
    if (conservationMessage) {
        toggleChangelog(conservationMessage);
    }

    renderEntities();
    renderLorebook();
}

function toggleChangelog(message) {
    const changelog = document.getElementById('changelog');
    if (message) {
        changelog.innerHTML += `<p>${message}</p>`;
    }
    changelog.style.display = changelog.style.display === 'none' ? 'block' : 'none';
}

function sortTable(columnIndex) {
    const entityContainer = document.getElementById('entityContainer').getElementsByTagName('tbody')[0];
    const rows = Array.from(entityContainer.rows);
    
    const sortedRows = rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].innerText;
        const bValue = b.cells[columnIndex].innerText;

        if (columnIndex === 1) { // ID
            return parseInt(aValue) - parseInt(bValue);
        } else if (columnIndex === 2) { // Points
            return parseInt(aValue) - parseInt(bValue);
        } else if (columnIndex === 3) { // Age
            return parseInt(aValue) - parseInt(bValue);
        } else { // Name
            return aValue.localeCompare(bValue);
        }
    });

    entityContainer.innerHTML = '';
    sortedRows.forEach(row => entityContainer.appendChild(row));
}

// Initialize starting entities
for (let i = 0; i < 20; i++) {
    entities.push(generateRandomEntity(i + 1));
}

renderEntities();
