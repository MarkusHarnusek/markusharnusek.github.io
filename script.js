// Light/Dark mode toggle
document.addEventListener('DOMContentLoaded', function () {
  // Apply theme from localStorage on all pages
  const theme = localStorage.getItem('theme');
  if (theme === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }

  // Listen for mode switch button
  const modeSwitch = document.querySelector('.mode-switch');
  if (modeSwitch) {
    modeSwitch.addEventListener('click', function () {
      document.body.classList.toggle('light-mode');
      if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.setItem('theme', 'dark');
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuIcon = document.querySelector('.menu-icon');

  if (menuToggle && menuIcon) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('open');
      menuIcon.classList.toggle('rotated');
    });
  }
});document.addEventListener('DOMContentLoaded', function () {
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