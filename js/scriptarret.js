$(function() {
    // Vérifier si Owl Carousel est disponible
    if (typeof $.fn.owlCarousel !== 'undefined') {
        var owl = $('.owl-carousel');

        // Initialiser le carrousel avec Owl Carousel
        owl.owlCarousel({
            items: 1,
            dots: true,
            nav: false,
            stagePadding: 10,
            loop: true,
            autoplay: true,
            autoplayTimeout: 3000, // Délai entre chaque slide (en millisecondes)
            margin: 25,
            mouseDrag: false
            // Vous pouvez ajouter d'autres options ici
        });

        // Variable pour stocker le timeout
        var autoplayTimeout;

        // Fonction pour démarrer l'autoplay
        // function startAutoplay() {
        //     owl.trigger('play.owl.autoplay', [1000]); // Reprendre l'autoplay avec un délai de 1 seconde
        // }

        // Fonction pour arrêter l'autoplay
        function stopAutoplay() {
            owl.trigger('stop.owl.autoplay');
        }

        // Arrêter l'autoplay au survol ou au clic
        owl.on('mouseenter click', function() {
            stopAutoplay();
            clearTimeout(autoplayTimeout); // Arrête le timeout si l'utilisateur interagit avec le carrousel
        });

        // Reprendre l'autoplay lorsque la souris quitte le carrousel
        // owl.on('mouseleave', function() {
        //     startAutoplay();
        // });

        // Gestion des clics sur les liens
        $('.show-item').on('click', function(event) {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            var targetIndex = $(this).data('target') - 1; // Récupère l'index de la cible

            // Arrêter l'autoplay lorsqu'un lien est cliqué
            stopAutoplay();
            clearTimeout(autoplayTimeout); // Arrête le timeout si l'utilisateur interagit avec le carrousel

            // Aller à l'élément cible avec animation
            owl.trigger('to.owl.carousel', [targetIndex, 500, true]);

            // Reprendre l'autoplay après 10 minutes (600000 ms)
            autoplayTimeout = setTimeout(startAutoplay, 600000);
        });
    } else {
        console.error("Owl Carousel n'est pas disponible. Assurez-vous de l'avoir inclus correctement.");
    }
});
