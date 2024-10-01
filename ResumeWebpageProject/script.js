let currentPage = 0;
let currentVerticalPage = 0;
const slidesWrapper = document.querySelector('.slides-wrapper');
const verticalWrapper = document.querySelector('.vertical-wrapper');
const totalPages = 7;

function updateSlideView() {
    slidesWrapper.style.transform = `translateX(-${currentPage * (100 / totalPages)}%)`;
}

function updateVerticalSlideView() {
    if (currentPage === 1) {
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
        currentVerticalPage = 0;
        updateVerticalSlideView();
        updateActiveDot();
    }
});

document.getElementById('up-btn').addEventListener('click', function() {
    if (currentPage === 1 && currentVerticalPage > 0) {
        currentVerticalPage--;
        updateVerticalSlideView();
        updateActiveDot();
    }
});

document.getElementById('down-btn').addEventListener('click', function() {
    if (currentPage === 1 && currentVerticalPage < 1) {
        currentVerticalPage++;
        updateVerticalSlideView();
        updateActiveDot();
    }
});

document.getElementById('interact-btn').addEventListener('click', function() {
    alert(`Interacting with Slide ${currentPage + 1}`);
});

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
        case 'a':
            if (currentPage > 0) {
                currentPage--;
                updateSlideView();
            }
            break;
        case 'ArrowRight':
        case 'd':
            if (currentPage < totalPages - 1) {
                currentPage++;
                updateSlideView();
                currentVerticalPage = 0;
                updateVerticalSlideView();
            }
            break;
        case 'ArrowUp':
        case 'w':
            if (currentPage === 1 && currentVerticalPage > 0) {
                currentVerticalPage--;
                updateVerticalSlideView();
            }
            break;
        case 'ArrowDown':
        case 's':
            if (currentPage === 1 && currentVerticalPage < 1) {
                currentVerticalPage++;
                updateVerticalSlideView();
            }
            break;
        case 'Enter':
            alert(`Interacting with Slide ${currentPage + 1}`);
            break;
    }
    updateActiveDot();
});

let startX, startY, distX, distY;
const threshold = 50;

document.addEventListener('touchstart', function(e) {
    const touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    e.preventDefault();
}, false);

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, false);

document.addEventListener('touchend', function(e) {
    const touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;

    if (Math.abs(distX) >= threshold) {
        if (distX > 0 && currentPage > 0) {
            currentPage--;
            updateSlideView();
        } else if (distX < 0 && currentPage < totalPages - 1) {
            currentPage++;
            updateSlideView();
            currentVerticalPage = 0;
            updateVerticalSlideView();
        }
    } else if (Math.abs(distY) >= threshold && currentPage === 1) {
        if (distY > 0 && currentVerticalPage > 0) {
            currentVerticalPage--;
            updateVerticalSlideView();
        } else if (distY < 0 && currentVerticalPage < 1) {
            currentVerticalPage++;
            updateVerticalSlideView();
        }
    }
    updateActiveDot();
    e.preventDefault();
}, false);

// Initialize the view
updateSlideView();
updateVerticalSlideView();
updateActiveDot();