const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;



// arrange the slides next to one another
function setSlidePosition (slide, index)  { // for loop, each slide in slides array, add style
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left +')';
    currentSlide.classList.remove('current-slide'); // classList remove the dot
    targetSlide.classList.add('current-slide'); 
};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

function next () {
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');

    if (currentSlide === track.lastElementChild) {
        var nextDot = dotsNav.firstElementChild;
        var nextSlide = track.firstElementChild;
    } else {
        var nextDot = currentDot.nextElementSibling;
        var nextSlide = currentSlide.nextElementSibling; // grab the current node sibling
    }
    
    moveToSlide(track, currentSlide, nextSlide) // move to the next slide 
    updateDots(currentDot, nextDot) 
}
// when I click right, move slide to the right
nextButton.addEventListener('click', e => {
    next()

});

// when I click left, move slide to the left

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    var currentDot = dotsNav.querySelector('.current-slide');

    if (currentSlide === track.firstElementChild) {
        var prevDot = dotsNav.lastElementChild
        var prevSlide = track.lastElementChild
    } else { 
        var prevDot = currentDot.previousElementSibling;
        var prevSlide = currentSlide.previousElementSibling;
    }
    
    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, prevDot)

});
// when I click the nav indicator, move to that slide

dotsNav.addEventListener('click', e => {     //  'e' what indicator was clicked
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex]

    moveToSlide(track, currentSlide, targetSlide)
    updateDots(currentDot, targetDot)
})

function autoplay () {
    next()
    setTimeout(autoplay, 7000)
};

setTimeout(autoplay, 7000)