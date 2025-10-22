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
    prevButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    prevButton.setAttribute('aria-label', 'Vorheriges Projekt');

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button carousel-next';
    nextButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
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

        prevButton.disabled = false;
        nextButton.disabled = false;
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, projects.length - 1));
        updateCarousel();
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= projects.length) {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = projects.length - 1;
        }
        updateCarousel();
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

        if (movedBy < -threshold) {
            currentIndex++;
            if (currentIndex >= projects.length) {
                currentIndex = 0;
            }
        } else if (movedBy > threshold) {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = projects.length - 1;
            }
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
        const slideWidth = projectsContainer.offsetWidth;
        currentTranslate = currentIndex * -slideWidth;
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

document.addEventListener('DOMContentLoaded', () => {
    const projectImages = document.querySelectorAll('.project .image img');
    
    if (!projectImages.length) {
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    overlay.innerHTML = `
        <div class="fullscreen-container">
            <button class="fullscreen-close" aria-label="Schließen">&times;</button>
            <button class="fullscreen-nav fullscreen-prev" aria-label="Vorheriges Bild">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="fullscreen-nav fullscreen-next" aria-label="Nächstes Bild">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <img class="fullscreen-image" src="" alt="">
            <div class="fullscreen-caption"></div>
            <div class="fullscreen-counter"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    const fullscreenImage = overlay.querySelector('.fullscreen-image');
    const fullscreenCaption = overlay.querySelector('.fullscreen-caption');
    const fullscreenCounter = overlay.querySelector('.fullscreen-counter');
    const closeBtn = overlay.querySelector('.fullscreen-close');
    const prevBtn = overlay.querySelector('.fullscreen-prev');
    const nextBtn = overlay.querySelector('.fullscreen-next');

    let currentImageIndex = 0;
    let allImages = [];

    projectImages.forEach((img, index) => {
        allImages.push({
            src: img.src,
            alt: img.alt,
            caption: img.parentElement.querySelector('.image-desc')?.textContent || ''
        });

        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.preventDefault();
            openFullscreen(index);
        });
    });

    function openFullscreen(index) {
        currentImageIndex = index;
        updateFullscreenImage();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeFullscreen() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateFullscreenImage() {
        const imageData = allImages[currentImageIndex];
        
        fullscreenImage.classList.remove('animate-zoom');
        
        void fullscreenImage.offsetWidth;
        
        fullscreenImage.src = imageData.src;
        fullscreenImage.alt = imageData.alt;
        fullscreenCaption.textContent = imageData.caption;
        fullscreenCounter.textContent = `${currentImageIndex + 1} / ${allImages.length}`;

        fullscreenImage.classList.add('animate-zoom');

        prevBtn.style.opacity = currentImageIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentImageIndex === allImages.length - 1 ? '0.5' : '1';
    }

    function showPreviousImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateFullscreenImage();
        }
    }

    function showNextImage() {
        if (currentImageIndex < allImages.length - 1) {
            currentImageIndex++;
            updateFullscreenImage();
        }
    }

    closeBtn.addEventListener('click', closeFullscreen);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeFullscreen();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeFullscreen();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
});
