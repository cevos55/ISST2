$(document).ready(function() {
    var owl = $('.owl-carousel');

    // Initialiser le carrousel avec Owl Carousel
    owl.owlCarousel({
        items: 1,
        dots: true,
        nav: false,
        stagePadding: 10,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000, // Délai entre chaque slide (en millisecondes)
        margin: 25,
        mouseDrag: false
    });

    // Arrêter l'autoplay au survol ou au clic
    owl.on('mouseenter click', function() {
        owl.trigger('stop.owl.autoplay');
    });

    // Reprendre l'autoplay lorsque la souris quitte le carrousel
    owl.on('mouseleave', function() {
        owl.trigger('play.owl.autoplay', [5000]); // Reprendre l'autoplay avec un délai de 5 secondes
    });
});

