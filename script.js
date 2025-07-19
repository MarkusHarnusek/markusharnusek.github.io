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

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = {
                FIRST_NAME: formData.get('FIRST_NAME'),
                LAST_NAME: formData.get('LAST_NAME'),
                EMAIL: formData.get('EMAIL'),
                CLASS: formData.get('CLASS'),
                MESSAGE: formData.get('MESSAGE')
            };
            try {
                const response = await fetch('http://10.9.28.30:5000/contact', {
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