// Light/Dark mode toggle
// This section handles the light/dark mode toggle functionality.
// It applies the theme from localStorage on page load and listens for user interactions to toggle the theme.
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

// Menu toggle functionality
// This section handles the menu toggle and ensures proper opening and closing of the menu.
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuIcon = document.querySelector('.menu-icon');

  if (menuToggle && menuIcon) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('open');
      menuIcon.classList.toggle('rotated');
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuSection = document.getElementById('menuSection');
  const menuIcon = document.querySelector('.menu-icon');

  // Helper functions to open and close the menu
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

  // Toggle menu on click
  menuToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    if (menuSection.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking outside or pressing Escape
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

  // Contact form handling
  // This section handles the contact form submission, including validation and server communication.
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      // Retrieve the last submission timestamp from localStorage
      const lastTimestamp = localStorage.getItem('lastSubmitTimestamp');
      const currentTimestamp = Date.now();

      // Check if the last submission was within 30 seconds
      if (lastTimestamp && currentTimestamp - lastTimestamp < 30000) {
        alert('Bitte warte 30 Sekunden, bevor du erneut sendest.');
        return;
      }

      // Update the timestamp in localStorage
      localStorage.setItem('lastSubmitTimestamp', currentTimestamp);

      e.preventDefault();
      const formData = new FormData(this);
      const data = {
        first_name: formData.get('FIRST_NAME'),
        last_name: formData.get('LAST_NAME'),
        email: formData.get('EMAIL'),
        class: formData.get('CLASS'),
        message: formData.get('MESSAGE')
      };

      try {
        // Send the form data to the server
        const response = await fetch('http://<Backend-ip>/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          alert('Nachricht gesendet!');
          this.reset();
        } else {
          alert('Fehler beim Senden der Nachricht.');
        }
      } catch (error) {
        alert('Verbindung zum Server fehlgeschlagen.');
      }
    });
  }
});