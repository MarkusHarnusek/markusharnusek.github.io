document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuSection = document.getElementById('menuSection');
    const menuIcon = document.querySelector('.menu-icon');

    function openMenu() {
        menuSection.classList.add('open');
        menuToggle.classList.add('open');
    }

    function closeMenu() {
        menuSection.classList.remove('open');
        menuSection.classList.add('collapsing');
        menuToggle.classList.remove('open');
        setTimeout(() => {
            menuSection.classList.remove('collapsing');
        }, 400); // Match CSS transition duration
    }

    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        if (menuSection.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener('click', function (e) {
        if (!menuSection.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
});