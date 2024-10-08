let currentIndex = 0;
const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const totalSlides = slideElements.length;

const nextButton = document.querySelector('.nav.next');
const prevButton = document.querySelector('.nav.prev');
const indicatorsContainer = document.querySelector('.indicators');

// Create indicators
slideElements.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicatorsContainer.appendChild(indicator);
});

// Update slide position and indicators
function updateSlider(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll('.indicator').forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider(currentIndex);
}

// Auto slide every 5 seconds
function startSlider() {
    setInterval(nextSlide,5000);
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Add indicator click event
document.querySelectorAll('.indicator').forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateSlider(currentIndex);
    });
});

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    updateSlider(currentIndex);
    startSlider();
});
