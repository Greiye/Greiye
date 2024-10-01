document.addEventListener('DOMContentLoaded', () => {
    const workoutDropdown = document.getElementById('workout-dropdown');
    const confirmWorkoutButton = document.getElementById('confirm-workout');
    const currentWorkoutDisplay = document.getElementById('current-workout');
    const workoutButton = document.getElementById('workout-btn');
    const saveSetButton = document.getElementById('save-set');
    const repsCountDisplay = document.getElementById('reps-count');
    const setsCountDisplay = document.getElementById('sets-count');
    const totalSetsDisplay = document.getElementById('total-sets');
    const workoutTable = document.getElementById('workout-table').getElementsByTagName('tbody')[0];
    const exportJSONButton = document.getElementById('export-json');

    let repsCount = 0;
    let sets = [];
    let currentWorkout = workoutDropdown.value;

    // Function to update the current workout display
    confirmWorkoutButton.addEventListener('click', () => {
        currentWorkout = workoutDropdown.value;
        currentWorkoutDisplay.textContent = currentWorkout;
    });

    // Function to count reps
    workoutButton.addEventListener('click', () => {
        repsCount++;
        repsCountDisplay.textContent = repsCount;
    });

    // Save reps as a set
    saveSetButton.addEventListener('click', () => {
        if (repsCount > 0) {
            const setNumber = sets.filter(set => set.workout === currentWorkout).length + 1;
            const time = new Date();
            const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

            const set = {
                workout: currentWorkout,
                set: `Set ${setNumber}`,
                reps: repsCount,
                time: formattedTime
            };

            sets.push(set);

            // Update table
            const row = workoutTable.insertRow();
            row.insertCell(0).textContent = set.workout;
            row.insertCell(1).textContent = set.set;
            row.insertCell(2).textContent = set.reps;
            row.insertCell(3).textContent = set.time;

            // Update total sets and sets display
            totalSetsDisplay.textContent = sets.length;
            setsCountDisplay.textContent = setNumber;

            // Reset reps count
            repsCount = 0;
            repsCountDisplay.textContent = repsCount;
        }
    });

    // Export as JSON
    exportJSONButton.addEventListener('click', () => {
        const jsonData = JSON.stringify(sets, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'workout_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
