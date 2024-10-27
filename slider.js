const sliderContainer = document.getElementById('sliderContainer');
const dots = document.querySelectorAll('.dot');
const slideWidth = 400 + 15; // Slide width + margin

// Function to scroll to specific slide
function scrollToSlide(index) {
    sliderContainer.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
    });
    updateDots(index);
}

// Function to update active dot based on current scroll position
function updateDots(activeIndex) {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

// Scroll left and right functions
function scrollsLeft() {
    sliderContainer.scrollBy({
        left: -slideWidth,
        behavior: 'smooth'
    });
}

function scrollsRight() {
    sliderContainer.scrollBy({
        left: slideWidth,
        behavior: 'smooth'
    });
}

// Event listener to update dots on scroll
sliderContainer.addEventListener('scroll', () => {
    const scrolledLeft = sliderContainer.scrollLeft;
    const index = Math.round(scrolledLeft / slideWidth);
    updateDots(index);
});

// Mouse drag functionality
let isDragging = false;
let startX;
let scrollStart;

sliderContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - sliderContainer.offsetLeft;
    scrollStart = sliderContainer.scrollLeft;
    // Prevent image selection
    e.preventDefault();
});

sliderContainer.addEventListener('mouseleave', () => {
    isDragging = false;
});

sliderContainer.addEventListener('mouseup', () => {
    isDragging = false;
});

sliderContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - sliderContainer.offsetLeft;
    const walk = (x - startX); // Calculate the distance dragged
    sliderContainer.scrollLeft = scrollStart - walk; // Scroll immediately with dragging
});

// Prevent default drag behavior on images
sliderContainer.addEventListener('dragstart', (e) => {
    e.preventDefault();
});