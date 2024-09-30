let currentPage = 0; // Start on the first slide (index 0)
let currentVerticalPage = 0; // Track vertical slides within slide 2
const slidesWrapper = document.querySelector('.slides-wrapper');
const verticalWrapper = document.querySelector('.vertical-wrapper');
const totalPages = 7; // We have 7 main slides in total

// Function to update the horizontal slide view
function updateSlideView() {
    slidesWrapper.style.transform = `translateX(-${currentPage * 100}vw)`;
}

// Function to update the vertical slide view for slide 2
function updateVerticalSlideView() {
    if (currentPage === 1) { // Slide 2 (index 1) has a vertical wrapper
        verticalWrapper.style.transform = `translateY(${50 - (currentVerticalPage * 100)}vh)`;
    }
}

function updateActiveDot() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPage);
    });
    
    if (currentPage === 1) {
        const verticalDots = document.querySelectorAll('.vertical-nav-dot');
        verticalDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentVerticalPage);
        });
    }
}

// Button listeners for horizontal navigation
document.getElementById('left-btn').addEventListener('click', function() {
    if (currentPage > 0) {
        currentPage--;
        updateSlideView();
        updateActiveDot();
    }
});

document.getElementById('right-btn').addEventListener('click', function() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateSlideView();
        currentVerticalPage = 0; // Reset vertical page if moving horizontally
        updateVerticalSlideView(); // Ensure Slide 2A is shown when revisiting
        updateActiveDot();
    }
});

// Button listeners for vertical navigation (for Slide 2)
document.getElementById('up-btn').addEventListener('click', function() {
    if (currentPage === 1 && currentVerticalPage > 0) {
        currentVerticalPage--;
        updateVerticalSlideView();
        updateActiveDot();
    }
});

document.getElementById('down-btn').addEventListener('click', function() {
    if (currentPage === 1 && currentVerticalPage < 1) { // 2 sub-slides: 2A (index 0) and 2B (index 1)
        currentVerticalPage++;
        updateVerticalSlideView();
        updateActiveDot();
    }
});

// Interact button (optional functionality)
document.getElementById('interact-btn').addEventListener('click', function() {
    alert(`Interacting with Slide ${currentPage + 1}`);
});

// Keypress event listeners for WASD and arrow keys
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft': // Left arrow key
        case 'a': // 'A' key for left
            if (currentPage > 0) {
                currentPage--;
                updateSlideView();
            }
            break;
        case 'ArrowRight': // Right arrow key
        case 'd': // 'D' key for right
            if (currentPage < totalPages - 1) {
                currentPage++;
                updateSlideView();
                currentVerticalPage = 0; // Reset vertical page if moving horizontally
                updateVerticalSlideView();
            }
            break;
        case 'ArrowUp': // Up arrow key
        case 'w': // 'W' key for up
            if (currentPage === 1 && currentVerticalPage > 0) {
                currentVerticalPage--;
                updateVerticalSlideView();
            }
            break;
        case 'ArrowDown': // Down arrow key
        case 's': // 'S' key for down
            if (currentPage === 1 && currentVerticalPage < 1) {
                currentVerticalPage++;
                updateVerticalSlideView();
            }
            break;
        case 'Enter': // Enter key for interact
            alert(`Interacting with Slide ${currentPage + 1}`);
            break;
    }
    updateActiveDot();
});

// Touch screen functionality
let startX, startY, distX, distY;
const threshold = 50; // minimum distance traveled to be considered swipe

document.addEventListener('touchstart', function(e) {
    const touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    e.preventDefault();
}, false);

document.addEventListener('touchmove', function(e) {
    e.preventDefault(); // Prevent scrolling when inside DIV
}, false);

document.addEventListener('touchend', function(e) {
    const touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;

    if (Math.abs(distX) >= threshold) {
        if (distX > 0) {
            // Swiped right
            if (currentPage > 0) {
                currentPage--;
                updateSlideView();
            }
        } else {
            // Swiped left
            if (currentPage < totalPages - 1) {
                currentPage++;
                updateSlideView();
                currentVerticalPage = 0; // Reset vertical page if moving horizontally
                updateVerticalSlideView();
            }
        }
    } else if (Math.abs(distY) >= threshold && currentPage === 1) {
        // Only handle vertical swipes on slide 2
        if (distY > 0) {
            // Swiped down
            if (currentVerticalPage > 0) {
                currentVerticalPage--;
                updateVerticalSlideView();
            }
        } else {
            // Swiped up
            if (currentVerticalPage < 1) {
                currentVerticalPage++;
                updateVerticalSlideView();
            }
        }
    }
    updateActiveDot();
    e.preventDefault();
}, false);