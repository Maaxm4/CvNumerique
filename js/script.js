document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');
    
    const slidesToShow = 3;
    let currentIndex = 0;
    const totalSlides = slides.length;

    // 1. Cloner les éléments pour l'infini
    for (let i = 0; i < slidesToShow; i++) {
        slider.appendChild(slides[i].cloneNode(true));
    }

    function getSlideWidth() {
        const margin = parseFloat(getComputedStyle(slides[0]).marginRight) || 0;
        return slides[0].offsetWidth + margin;
    }

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
    }

    // 2. Navigation
    nextButton.addEventListener('click', () => {
        currentIndex++;
        slider.style.transition = "transform 0.5s ease-in-out";
        updateSliderPosition();
        if (currentIndex >= totalSlides) {
            setTimeout(() => {
                slider.style.transition = "none";
                currentIndex = 0;
                updateSliderPosition();
            }, 500);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex === 0) {
            slider.style.transition = "none";
            currentIndex = totalSlides;
            updateSliderPosition();
            setTimeout(() => {
                slider.style.transition = "transform 0.5s ease-in-out";
                currentIndex--;
                updateSliderPosition();
            }, 50);
        } else {
            currentIndex--;
            updateSliderPosition();
        }
    });

    // 3. Gestion de la Modale (Délégation d'événement)
    slider.addEventListener('click', (e) => {
        const slide = e.target.closest('.slide');
        if (slide) {
            const title = slide.querySelector('h3').innerText;
            const details = slide.getAttribute('data-details');
            const stack = slide.getAttribute('data-stack');
            
            modalTitle.innerText = title;
            modalBody.innerHTML = `<p>${details}</p><br><p><strong>Stack :</strong> ${stack}</p>`;

            modal.style.display = "block";
        }
    });

    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }
    window.addEventListener('resize', updateSliderPosition);
});