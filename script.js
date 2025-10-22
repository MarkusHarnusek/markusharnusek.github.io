document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('.projects');
    const projects = document.querySelectorAll('.project');

    if (!projects.length) {
        return;
    }

    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    const navContainer = document.createElement('div');
    navContainer.className = 'carousel-nav';

    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button carousel-prev';
    prevButton.innerHTML = '&#8249;';
    prevButton.setAttribute('aria-label', 'Vorheriges Projekt');

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button carousel-next';
    nextButton.innerHTML = '&#8250;';
    nextButton.setAttribute('aria-label', 'Nächstes Projekt');

    navContainer.appendChild(prevButton);
    navContainer.appendChild(nextButton);

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';

    projects.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Gehe zu Projekt ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    projectsContainer.parentElement.appendChild(navContainer);
    projectsContainer.parentElement.appendChild(dotsContainer);

    function updateCarousel() {
        projectsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === projects.length - 1;
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, projects.length - 1));
        updateCarousel();
    }

    function nextSlide() {
        if (currentIndex < projects.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    projectsContainer.addEventListener('mousedown', dragStart);
    projectsContainer.addEventListener('touchstart', dragStart);
    projectsContainer.addEventListener('mouseup', dragEnd);
    projectsContainer.addEventListener('touchend', dragEnd);
    projectsContainer.addEventListener('mousemove', drag);
    projectsContainer.addEventListener('touchmove', drag);
    projectsContainer.addEventListener('mouseleave', dragEnd);

    projectsContainer.addEventListener('dragstart', e => e.preventDefault());

    function dragStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        projectsContainer.style.cursor = 'grabbing';
    }

    function drag(event) {
        if (!isDragging) 
        {
            return;
        }

        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }

    function dragEnd() {
        if (!isDragging)  {
            return;
        }
        
        isDragging = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        const threshold = projectsContainer.offsetWidth * 0.3;

        if (movedBy < -threshold && currentIndex < projects.length - 1) {
            currentIndex++;
        } else if (movedBy > threshold && currentIndex > 0) {
            currentIndex--;
        }

        setPositionByIndex();
        projectsContainer.style.cursor = 'grab';
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging){
            requestAnimationFrame(animation);
        }
    }

    function setSliderPosition() {
        projectsContainer.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -projectsContainer.offsetWidth;
        prevTranslate = currentTranslate;
        updateCarousel();
    }

    updateCarousel();
    projectsContainer.style.cursor = 'grab';

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setPositionByIndex();
        }, 250);
    });
});
