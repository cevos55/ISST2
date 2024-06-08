document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('toggleButton');
    var sections = document.querySelectorAll('.section-deroule');

    button.addEventListener('click', function() {
        sections.forEach(function(section) {
            section.style.display = 'block'; // Afficher la section
        });
        button.style.display = 'none'; // Masquer le bouton après avoir affiché les sections
    });
});