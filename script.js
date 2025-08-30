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

// Get lessons from backend
async function fetchCalendarData() {
  try {
    const response = await fetch('http://<Backend-URL>/api/calendar', {
      method: 'GET', // HTTP method (GET, POST, etc.)
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();

    const lessons = data.map(item => ({
      id: item.id,
      startTime: new Date(item.start_time),
      endTime: new Date(item.end_time),
      subjectId: item.subject_id,
      studentId: item.student_id,
      statusId: item.status_id,
    }));

    return lessons;
  } catch (error) {
    console.error('Error fetching calendar data:', error);
  }
}

// Helper function to format time as HH:mm
function formatTime(date) {
  return date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Updated fillIndexLessons to style requested and accepted lessons
function fillIndexLessons(lessons) {
  const calendarTableBody = document.querySelector('.calendar-table tbody');

  if (!calendarTableBody) {
    console.error('Calendar table body not found!');
    return;
  }

  // Clear existing rows
  calendarTableBody.innerHTML = '';

  // Define the days of the week
  const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

  // Group lessons by time slot
  const lessonsByTime = {};
  lessons.forEach(lesson => {
    const timeSlot = formatTime(new Date(lesson.start_time));
    if (!lessonsByTime[timeSlot]) {
      lessonsByTime[timeSlot] = {};
    }
    lessonsByTime[timeSlot][lesson.day] = lesson;
  });

  // Generate rows for each time slot
  Object.keys(lessonsByTime).sort().forEach(timeSlot => {
    const row = document.createElement('tr');

    // Add the time slot cell
    const timeCell = document.createElement('td');
    timeCell.textContent = timeSlot;
    row.appendChild(timeCell);

    // Add cells for each day
    days.forEach(day => {
      const cell = document.createElement('td');
      const lesson = lessonsByTime[timeSlot][day];

      if (lesson) {
        switch (lesson.status_id) {
          case 0:
            cell.textContent = 'Frei';
            cell.classList.add('free');
            break;
          case 1:
            cell.textContent = 'Angefragt';
            cell.classList.add('pending'); // Yellow styling
            break;
          case 2:
            cell.textContent = 'Reserviert';
            cell.classList.add('accepted'); // Red styling
            break;
          default:
            cell.textContent = 'Unbekannt';
            cell.classList.add('unknown');
        }
      } else {
        cell.textContent = ''; // Leave the field empty if no lesson data
      }

      row.appendChild(cell);
    });

    calendarTableBody.appendChild(row);
  });
}

// Example usage: Fetch lessons for the current week and populate the table
async function loadCurrentWeekLessons() {
  try {
    const response = await fetch('http://<Backend-URL>/api/lessons/current-week', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const lessons = await response.json();

    // Transform lessons data to include day names
    const transformedLessons = lessons.map(lesson => ({
      ...lesson,
      day: new Date(lesson.start_time).toLocaleDateString('de-DE', { weekday: 'long' }),
      start_time: new Date(lesson.start_time).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));

    fillIndexLessons(transformedLessons);
  } catch (error) {
    console.error('Error loading lessons:', error);
  }
}

// Call the function to load and display lessons for the current week
loadCurrentWeekLessons();

// Lesson class definition
class Lesson {
  constructor(id, start_time, end_time, subject_id, student_id, status_id) {
    this.id = id;
    this.start_time = start_time;
    this.end_time = end_time;
    this.subject_id = subject_id;
    this.student_id = student_id;
    this.status_id = status_id;
  }
}

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

  // Ensure lessons are loaded and the table is filled when the site is loaded
  document.addEventListener('DOMContentLoaded', function () {
    loadCurrentWeekLessons();
  });
});

// Updated method to generate random mock lesson data
function generateMockLessons() {
  const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
  const lessons = [];
  let idCounter = 1;

  // Helper function to generate a random integer between min and max (inclusive)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generate random lessons for each day
  days.forEach(day => {
    const lessonCount = getRandomInt(0, 3); // Randomly decide how many lessons (0-3) for the day

    for (let i = 0; i < lessonCount; i++) {
      const startHour = getRandomInt(8, 16); // Random start hour between 8 AM and 4 PM
      const endHour = startHour + 1; // Lessons are 1 hour long

      lessons.push({
        id: idCounter++,
        start_time: new Date(new Date().setHours(startHour, 0, 0, 0)),
        end_time: new Date(new Date().setHours(endHour, 0, 0, 0)),
        subject_id: getRandomInt(101, 110), // Random subject ID
        student_id: getRandomInt(201, 210), // Random student ID
        status_id: getRandomInt(0, 2), // Random status (0: free, 1: requested, 2: accepted)
        day: day,
      });
    }
  });

  return lessons;
}

// Example usage: Fill the table with mock lessons for testing
function loadMockLessons() {
  const mockLessons = generateMockLessons();
  fillIndexLessons(mockLessons);
}

// Uncomment the following line to test with mock lessons
loadMockLessons();

// Function to load lessons dynamically into the Wochenübersicht table
function updateWeekTable(lessons) {
  const calendarBody = document.getElementById('calendar-body');

  if (!calendarBody) {
    console.error('Calendar body not found!');
    return;
  }

  // Clear existing rows
  calendarBody.innerHTML = '';

  // Define the days of the week
  const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

  // Group lessons by time slot
  const lessonsByTime = {};
  lessons.forEach(lesson => {
    const timeSlot = formatTime(new Date(lesson.start_time));
    if (!lessonsByTime[timeSlot]) {
      lessonsByTime[timeSlot] = {};
    }
    lessonsByTime[timeSlot][lesson.day] = lesson;
  });

  // Generate rows for each time slot
  Object.keys(lessonsByTime).sort().forEach(timeSlot => {
    const row = document.createElement('tr');

    // Add the time slot cell
    const timeCell = document.createElement('td');
    timeCell.textContent = timeSlot;
    row.appendChild(timeCell);

    // Add cells for each day
    days.forEach(day => {
      const cell = document.createElement('td');
      const lesson = lessonsByTime[timeSlot][day];

      if (lesson) {
        switch (lesson.status_id) {
          case 0:
            cell.textContent = 'Frei';
            cell.classList.add('free');
            break;
          case 1:
            cell.textContent = 'Angefragt';
            cell.classList.add('pending');
            break;
          case 2:
            cell.textContent = 'Reserviert';
            cell.classList.add('accepted');
            break;
          default:
            cell.textContent = 'Unbekannt';
            cell.classList.add('unknown');
        }
      } else {
        cell.textContent = '';
      }

      row.appendChild(cell);
    });

    calendarBody.appendChild(row);
  });
}

// Load mock lessons on page load for testing
document.addEventListener('DOMContentLoaded', function () {
  const mockLessons = generateMockLessons();
  updateWeekTable(mockLessons);
});

// Function to generate random weeks for lessons
function generateRandomWeeks() {
  const weeks = [];
  const currentDate = new Date();

  // Generate 10 random weeks starting from the current week
  for (let i = 0; i < 10; i++) {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() + i * 7);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4); // Monday to Friday

    weeks.push({
      label: `KW ${i + 1} (${startOfWeek.toLocaleDateString('de-DE')} - ${endOfWeek.toLocaleDateString('de-DE')})`,
      value: `kw${i + 1}`,
    });
  }

  return weeks;
}

// Function to populate the week selection dropdown
function populateWeekSelection(weeks) {
  const weekSelect = document.getElementById('week');

  if (!weekSelect) {
    console.error('Week selection dropdown not found!');
    return;
  }

  // Clear existing options
  weekSelect.innerHTML = '';

  // Add options for each week
  weeks.forEach(week => {
    const option = document.createElement('option');
    option.value = week.value;
    option.textContent = week.label;
    weekSelect.appendChild(option);
  });
}

// Function to generate mock lessons for multiple weeks
function generateMockLessonsForWeeks(weeks) {
  const lessonsByWeek = {};

  weeks.forEach((week, index) => {
    const lessons = generateMockLessons();
    lessonsByWeek[week.value] = lessons;
  });

  return lessonsByWeek;
}

// Global variable to store lessons (mocked or fetched from backend)
let lessonsByWeek = {}

// Function to fetch lessons from the backend
async function fetchLessonsForWeeks(weeks) {
  const fetchedLessonsByWeek = {};

  try {
    for (const week of weeks) {
      const response = await fetch(`http://<Backend-URL>/api/lessons/${week.value}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch lessons for ${week.value}`);
      }

      const lessons = await response.json();
      fetchedLessonsByWeek[week.value] = lessons.map(lesson => ({
        ...lesson,
        day: new Date(lesson.start_time).toLocaleDateString('de-DE', { weekday: 'long' }),
        start_time: new Date(lesson.start_time).toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));
    }

    return fetchedLessonsByWeek;
  } catch (error) {
    console.error('Error fetching lessons from backend:', error);
    return null; // Return null to indicate failure
  }
}

// Updated initializeLessons to fallback to mocked lessons if none can be loaded
async function initializeLessons() {
  const weeks = generateRandomWeeks();
  populateWeekSelection(weeks);

  // Try to fetch lessons from the backend
  const fetchedLessons = await fetchLessonsForWeeks(weeks);

  if (fetchedLessons) {
    lessonsByWeek = fetchedLessons;
  } else {
    // Fallback to mock lessons if fetching fails
    console.warn('Falling back to mocked lessons.');
    lessonsByWeek = generateMockLessonsForWeeks(weeks);
  }

  // Load the first week's lessons by default
  updateWeekTable(lessonsByWeek[weeks[0].value]);

  // Add event listener for week selection
  const weekSelect = document.getElementById('week');
  weekSelect.addEventListener('change', function () {
    const selectedWeek = this.value;
    updateWeekTable(lessonsByWeek[selectedWeek]);
  });
}

// Initialize lessons on page load
document.addEventListener('DOMContentLoaded', initializeLessons);

// Populate lessons dropdown on form load
document.addEventListener('DOMContentLoaded', function () {
  const lessonsDropdown = document.createElement('select');
  lessonsDropdown.required = true;

  const lessonsByWeek = window.lessonsByWeek || {}; // Use global lessonsByWeek
  const freeLessons = [];

  // Collect all free lessons (status_id === 0)
  Object.values(lessonsByWeek).forEach(weekLessons => {
    weekLessons.forEach(lesson => {
      if (lesson.status_id === 0) {
        freeLessons.push(lesson);
      }
    });
  });

  // Populate the dropdown with free lessons
  if (freeLessons.length === 0) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Keine freien Stunden verfügbar';
    lessonsDropdown.appendChild(option);
  } else {
    freeLessons.forEach(lesson => {
      const option = document.createElement('option');
      option.value = lesson.id;
      option.textContent = `${lesson.day}, ${lesson.start_time} - ${lesson.end_time}`;
      lessonsDropdown.appendChild(option);
    });
  }

  // Replace the form's select element with the lessons dropdown
  const form = document.querySelector('form');
  const subjectSelect = form.querySelector('select');
  subjectSelect.replaceWith(lessonsDropdown);
});