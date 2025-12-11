document.addEventListener('DOMContentLoaded', () => {
    // 1. Sélection des éléments du carrousel
    const slider = document.querySelector('.slider');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const slidesToShow = 3; // Nombre de projets visibles à la fois (selon votre CSS)

    let currentIndex = 0;
    const totalSlides = slides.length;

    // 2. Dupliquer les slides pour créer l'illusion de la boucle infinie
    // On duplique un nombre de slides égal au nombre de slides visibles
    for (let i = 0; i < slidesToShow; i++) {
        slider.appendChild(slides[i].cloneNode(true));
    }
    
    // 3. Fonction pour calculer la largeur d'un élément (pour le défilement)
    function getSlideWidth() {
        // Largeur du slide + marge droite (1rem = 16px par défaut)
        const margin = parseFloat(getComputedStyle(slides[0]).marginRight) || 0;
        return slides[0].offsetWidth + margin;
    }

    // 4. Fonction pour mettre à jour la position du carrousel
    function updateSliderPosition() {
        const slideWidth = getSlideWidth();
        // Déplace le slider vers la gauche en fonction de l'index et de la largeur
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    // 5. Logique du bouton SUIVANT
    nextButton.addEventListener('click', () => {
        currentIndex++;
        updateSliderPosition();

        // Si on a atteint les slides clonés (fin de la liste réelle)
        if (currentIndex >= totalSlides) {
            setTimeout(() => {
                // Saut instantané au début (sans transition)
                slider.style.transition = 'none';
                currentIndex = 0;
                updateSliderPosition();
                
                // On réactive la transition pour le prochain mouvement
                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }, 500); // 500ms correspond à la durée de la transition CSS
        }
    });

    // 6. Logique du bouton PRÉCÉDENT
    prevButton.addEventListener('click', () => {
        if (currentIndex === 0) {
            // Saut instantané à la fin du slider (au dernier vrai slide)
            slider.style.transition = 'none';
            currentIndex = totalSlides;
            updateSliderPosition();
            
            // On remet la transition et on recule d'un cran
            setTimeout(() => {
                slider.style.transition = 'transform 0.5s ease-in-out';
                currentIndex--;
                updateSliderPosition();
            }, 50);
            
        } else {
            currentIndex--;
            updateSliderPosition();
        }
    });

    // Optionnel : Mise à jour de la position au chargement et au redimensionnement
    window.addEventListener('resize', updateSliderPosition);
    updateSliderPosition(); // Assure la position initiale correcte
});