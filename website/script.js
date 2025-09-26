// The following classes are those sent to the server containing user requests
class LessonRequest {
    constructor(
        first_name,
        last_name,
        email,
        subject,
        date,
        start_time_id,
        student_class,
        ip
    ) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.subject = subject;
        this.date = date;
        this.start_time_id = start_time_id;
        this.student_class = student_class;
        this.ip = ip;
    }
}

class ContactRequest {
    constructor(first_name, last_name, email, title, body, ip) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.student_class = student_class;
        this.title = title;
        this.body = body;
        this.ip = ip;
    }
}

// The following classes are those being obtained from the server in order to display the current data
class Subject {
    constructor(id, name, shortcut, teacher, description) {
        this.id = id;
        this.name = name;
        this.shortcut = shortcut;
        this.teacher = teacher;
        this.description = description;
    }
}

class Status {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Lesson {
    constructor(id, StartTime, date, Subject, Student, Status) {
        this.id = id;
        this.start_time = StartTime;
        this.date = date;
        this.subject = Subject;
        this.student = Student;
        this.status = Status;
    }
}

class StartTime {
    constructor(id, time) {
        this.id = id;
        this.time = time;
    }
}

class Student {
    constructor(id, first_name, last_name, student_class, email_address) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.student_class = student_class;
        this.email_address = email_address;
    }
}

// These arrays store the data obtained from the server
let thisWeeksLessons = [];
let next3WeeksLessons = [];
let subjects = [];
let statuses = [];
let start_times = [];

// Varaiables used to indicate if certain data is available
let lessonsAvailable = true;
let subjectsAvailable = true;

// Variable to see which page is open
let currentPage;

// Server ip address
const serverLocation = "https://localhost:8443";

document.addEventListener("DOMContentLoaded", async function () {
    // Set up and fetch data
    // Determine current page
    currentPage = window.location.pathname;

    let ip = await getClientIp();
    console.log(ip);

    // Fetch data from the backend and assign the subjects to the list of subjects being taught
    await getBackendData();

    // Get lessons for the next three weeks and assign them to the next3WeeksLessons list
    for (let i = 0; i < 3; i++) {
        let getWeekNumber;

        if (getISOWeek() + i > getWeeksInYear()) {
            getWeekNumber = getISOWeek() + i - getWeeksInYear();
        } else {
            getWeekNumber = getISOWeek() + i;
        }

        const lessons = await getLessons(getWeekNumber);
        next3WeeksLessons.push(lessons);
    }

    next3WeeksLessons.forEach((lesson) => {
        console.log(lesson);
    });

    // Get the current weeks lessons and assign them to the thisWeeksLessons list;
    thisWeeksLessons = await getLessons(getISOWeek());

    // Toggeling functionality for themes
    // Apply the theme from teh local storage for all pages
    const theme = localStorage.getItem("theme");

    if (theme === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }

    // Listen for mode switch button event
    const mode = document.getElementById("mode-switch");
    if (mode) {
        mode.addEventListener("click", function () {
            document.body.classList.toggle("light-mode");
            if (document.body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }
        });
    }

    // Navigation menu functionality
    const menuToggle = document.querySelector(".menu-toggle");
    const menuSection = document.getElementById("menuSection");

    if (menuToggle && menuSection) {
        // Helper functions to open and close the menu
        function openMenu() {
            menuSection.classList.add("open");
            menuToggle.classList.add("open");
        }

        function closeMenu() {
            menuSection.classList.remove("open");
            menuSection.classList.add("collapsing");
            menuToggle.classList.remove("open");

            setTimeout(function () {
                menuSection.classList.remove("collapsing");
            }, 400); // Match CSS transition duration
        }

        // Toggle menu on click
        menuToggle.addEventListener("click", function (e) {
            e.stopPropagation();

            if (menuSection.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking outside or pressing escape
        document.addEventListener("click", function (e) {
            if (
                menuSection &&
                !menuSection.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", function (e) {
            if (
                e.key === "Escape" &&
                menuSection &&
                menuSection.classList &&
                menuSection.classList.contains("open")
            ) {
                closeMenu();
            }
        });
    }

    // Run code based on the currently opened window
    if (currentPage.endsWith("index.html")) {
        // Index page
        // Populate index page calendar
        populateIndexCalendar(thisWeeksLessons);

        // Contact form handling
        const contactForm = document.getElementById("contactForm");
        if (contactForm) {
            contactForm.addEventListener("submit", async function (e) {
                // Check if user is timed out
                if (!getUserTimeout()) {
                    e.preventDefault();

                    // Get form data
                    const formData = new FormData(this);
                    const data = {
                        first_name: formData.get("FIRST_NAME"),
                        last_name: formData.get("LAST_NAME"),
                        email: formData.get("EMAIL"),
                        student_class: formData.get("CLASS"),
                        message: formData.get("MESSAGE"),
                    };

                    // Get client ip address
                    let clientIp;
                    await getClientIp()
                        .then((ip) => {
                            clientIp = ip;
                        })
                        .catch((error) => {
                            clientIp = "unknown";
                            console.warn(
                                "Could not determine client IP address:",
                                error
                            );
                        });

                    // Create contact request
                    const contactRequest = new ContactRequest(
                        (first_name = data.first_name),
                        (last_name = data.last_name),
                        (email = data.email),
                        (student_class = data.student_class),
                        (message = data.message),
                        (ip_address = clientIp)
                    );

                    // Send contact request
                    try {
                        const response = await fetch(
                            `${serverLocation}/contact`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(contactRequest),
                            }
                        );

                        if (response.ok) {
                            alert("Nachricht gesendet.");
                            this.reset();
                        } else {
                            console.error(
                                "Error sending contact request:",
                                response.statusText
                            );
                            alert(
                                "Es gibt ein Problem beim Senden deiner Anfrage. Bitte versuche es später erneut."
                            );
                        }
                    } catch (error) {
                        console.error("Error sending contact request:", error);
                        alert(
                            "Es gibt ein Problem beim Senden deiner Anfrage. Bitte versuche es später erneut."
                        );
                    }
                }
            });
        }
    } else if (currentPage.endsWith("buchen.html")) {
        const form = document.getElementById("lesson-request-form");
        if (form) {
            form.addEventListener("submit", async function (e) {
                e.preventDefault();

                // Check if user is timed out
                if (!getUserTimeout()) {
                    const formdata = new FormData(this);
                    const data = {
                        first_name: formdata.get("FIRST_NAME"),
                        last_name: formdata.get("LAST_NAME"),
                        email: formdata.get("EMAIL"),
                        student_class: formdata.get("CLASS"),
                        subject: formdata.get("SUBJECT"),
                        date: formdata.get("DATE"),
                        time: formdata.get("TIME"),
                    };
                }

                // Get client ip address
                let clientIp;
                await getClientIp()
                    .then((ip) => {
                        clientIp = ip;
                    })
                    .catch((error) => {
                        clientIp = "unknown";
                        console.warn(
                            "Could not determine client IP address:",
                            error
                        );
                    });

                // Form lesson request
                const lessonRequest = new LessonRequest(
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.subject,
                    data.date,
                    data.time,
                    data.student_class,
                    clientIp
                );

                // Send lesson request
                try {
                    const response = await fetch(
                        `${serverLocation}/request-lesson`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(lessonRequest),
                        }
                    );

                    if (response.ok) {
                        alert("Anfrage gesendet.");
                        this.reset();
                    } else {
                        console.error(
                            "Error sending lesson request:",
                            response.statusText
                        );
                        alert(
                            "Es gibt ein Problem beim Senden deiner Anfrage. Bitte versuche es später erneut."
                        );
                    }
                } catch (error) {
                    console.error("Error sending contact request:", error);
                    alert(
                        "Es gibt ein Problem beim Senden deiner Anfrage. Bitte versuche es später erneut."
                    );
                }
            });
        }
    } else if (currentPage.endsWith("wochen.html")) {
        // Full calendar page
        populateCalendar(getISOWeek());

        console.log("Populating calendar for week " + getISOWeek());

        const weekSelect = document.getElementById("calendar-week-select");

        // Add the next three weeks to the selection
        for (let i = 0; i < 3; i++) {
            let getWeekNumber;

            if (getISOWeek() + i > getWeeksInYear()) {
                getWeekNumber = getISOWeek() + i - getWeeksInYear();
            } else {
                getWeekNumber = getISOWeek() + i;
            }

            const weekOption = document.createElement("option");
            const getStartEnd = getWeekStartAndEndDates(getWeekNumber);
            let newStartEnd = "";

            getStartEnd.split("").forEach((char) => {
                if (char === "/") {
                    newStartEnd += ".";
                } else {
                    newStartEnd += char;
                }
            });

            weekOption.value = getWeekNumber;
            weekOption.textContent = `Woche ${getWeekNumber} ${newStartEnd.replace(
                " - ",
                " bis "
            )}`;
            weekSelect.appendChild(weekOption);
        }

        if (weekSelect) {
            console.log("Adding event listener to week select");
            weekSelect.addEventListener("change", function () {
                const selectedWeek = this.value;

                // Call the function to update the calendar with the selected week
                populateCalendar(selectedWeek);
            });
        }
    }
});

// Helper function to timeout too many requests client side
function getUserTimeout() {
    const lastTimestamp = localStorage.getItem("lastSubmitTimestamp");
    const currentTimestamp = Date.now();

    if (lastTimestamp && currentTimestamp - lastTimestamp < 30000) {
        alert("Bitte warte, bevor du erneut sendest.");
        return true;
    }

    localStorage.setItem("lastSubmitTimestamp", currentTimestamp);
    return false;
}

// Gets the current client ip address
async function getClientIp() {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.warn("Unable to obtain IPv6, falling back to IPv4:", error);
        try {
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error("Error fetching public IP:", error);
        }
    }
}

async function getLessons(week) {
    // Fetch current lesson data
    try {
        const response = await fetch(
            `${serverLocation}/api/lessons?WEEK=${week}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!response.ok) {
            console.error("Error fetching lessons:", response.statusText);
            lessonsAvailable = false;
            return;
        }

        // Get lesson body
        const body = await response.json();

        // Deserialize body into lesson objects
        return body.map(
            (lesson) =>
                new Lesson(
                    lesson.id,
                    lesson.start_time,
                    lesson.date,
                    lesson.subject,
                    lesson.student,
                    lesson.status
                )
        );
    } catch (error) {
        console.error("Error fetching lessons:", error);
        lessonsAvailable = false;
        return;
    }
}

async function getBackendData() {
    // Fetch currnet statuses and subjects to populate the UI
    try {
        // Fetch statues
        const statusResponse = await fetch(`${serverLocation}/api/statuses`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        // Error handling should the response fail
        if (!statusResponse.ok) {
            console.error(
                "Error fetching statuses:",
                statusResponse.statusText
            );
        } else {
            // Await JSON body
            const statusBody = await statusResponse.json();

            // Map JSON body into status onjects and add them to statuses
            statuses = statusBody.map(
                (status) => new Status(status.id, status.name)
            );
        }

        // Repeat for subjects
        const subjectResponse = await fetch(`${serverLocation}/api/subjects`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!subjectResponse.ok) {
            console.error(
                "Error fetching subjects:",
                subjectResponse.statusText
            );
            subjectsAvailable = false;
        } else {
            const subjectBody = await subjectResponse.json();

            subjects = subjectBody.map(
                (subject) =>
                    new Subject(
                        subject.id,
                        subject.name,
                        subject.short,
                        subject.teacher,
                        subject.description
                    )
            );
        }

        // Repeat for lessons start times
        const timeResponse = await fetch(`${serverLocation}/api/start_times`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!timeResponse.ok) {
            console.error(
                "Error fetching lesson start times.",
                timeResponse.statusText
            );
        } else {
            const timeBody = await timeResponse.json();

            lessonStartTimes = timeBody.map(
                (time) => new StartTime(time.id, time.time)
            );
        }
    } catch (error) {
        console.error("Error fetching subjects or statuses:", error);
        subjectsAvailable = false;
    } finally {
        // Run helper method to assign subjects to the list of subjects being taught
        assignSubjects();
    }
}

function assignSubjects() {
    // TODO Rename
    const cardsContainer = document.getElementById("subject-cards");

    if (!cardsContainer) {
        console.warn("No cards container found");
    } else {
        if (!subjectsAvailable) {
            console.warn("No subjects available");

            if (!currentPage.endsWith("index.html")) {
                return;
            }

            const noSubjectsWarning = document.createElement("div");
            noSubjectsWarning.classList.add("card");
            noSubjectsWarning.innerHTML = `<p class="error-text"><strong>Momentan sind keine Fächer verfügbar.</strong></p>`;
            cardsContainer.appendChild(noSubjectsWarning);
            return;
        }

        subjects.forEach((subject) => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
        <h4>${subject.name}</h4>
        <p><strong>${subject.teacher}</strong></p>
        <p>${subject.description}</p>
    `;

            cardsContainer.appendChild(card);
        });
    }
}

// Helper method to get the current calendar week
function getISOWeek() {
    const today = new Date();
    const dayNum = today.getDay() || 7;
    today.setDate(today.getDate() + 4 - dayNum);
    const yearStart = new Date(today.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
        ((today - yearStart) / (24 * 60 * 60 * 1000) + 1) / 7
    );
    return weekNumber;
}

// Helper method to get the number of weeks in the current year
function getWeeksInYear(year = new Date().getFullYear()) {
    const firstDayOfYear = new Date(year, 0, 1);
    const lastDayOfYear = new Date(year, 11, 31);

    const has53Weeks =
        firstDayOfYear.getDay() === 4 || lastDayOfYear.getDay() === 4;

    return has53Weeks ? 53 : 52;
}

// Used to populate current week's calendar on index.html
function populateIndexCalendar(lessons) {
    const calendarBody = document.getElementById("index-calendar-table");

    if (!calendarBody) {
        console.warn(
            "Unable to obtain this calendar table or this week's lessons"
        );
        return;
    }

    if (!Array.isArray(lessons) || !lessonsAvailable) {
        console.warn("Invalid or missing lessons data");
        calendarBody.innerHTML =
            "<tr><td colspan='6' class='error-text'><strong>Keine Nachhilfestunden verfügbar</strong></td></tr>";
        return;
    }

    // Clear calendar body
    calendarBody.innerHTML = "";

    // Group lessons by weekdays
    const weekdays = [
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
    ];
    const days = ["Uhrzeit", ...weekdays];

    const lessonsByDay = {};

    days.forEach((day) => {
        lessonsByDay[day] = [];
        const column = document.createElement("th");
        column.textContent = day;
        calendarBody.appendChild(column);
    });

    days.forEach((day) => (lessonsByDay[day] = []));

    lessons.forEach((lesson) => {
        const dayIndex = new Date(lesson.date).getDay();
        if (dayIndex >= 1 && dayIndex <= 5) {
            lessonsByDay[weekdays[dayIndex - 1]].push(lesson);
        }
    });

    for (let i = 0; i < lessonStartTimes.length; i++) {
        const row = document.createElement("tr");
        calendarBody.appendChild(row);

        for (let j = 0; j < days.length; j++) {
            const cell = document.createElement("td");
            if (j === 0) {
                cell.textContent = lessonStartTimes[i].time;
            } else {
                const columnDate = addDaysToDate(
                    getWeekStartAndEndDates(getISOWeek())
                        .split(" - ")[0]
                        .slice(1),
                    j - 1
                );
                const lesson = lessons.find(
                    (l) =>
                        l.date.split("T")[0] === columnDate &&
                        l.start_time.time === lessonStartTimes[i].time
                );
                if (lesson) {
                    switch (lesson.status.id) {
                        case 1:
                        case 2:
                            cell.textContent = "frei";
                            cell.classList.add("free");
                            break;

                        case 3:
                            cell.textContent = "belegt";
                            cell.classList.add("accepted");
                            break;
                    }

                    cell.classList.add("lesson-cell");
                }
            }
            row.appendChild(cell);
        }
    }
}

// Add days to date
function addDaysToDate(date, days) {
    let previous = Date.parse(date);
    let newDate = new Date(previous);
    newDate.setDate(newDate.getDate() + days);
    return newDate.toISOString().split("T")[0];
}

// Function to populate the calendar on the calendar page
function populateCalendar(week) {
    const calendarBody = document.getElementById("calendar-table-threeWeeks");
    let lessons = next3WeeksLessons[week - getISOWeek()]; // TODO add new year overflow

    if (!calendarBody) {
        console.warn(
            "Unable to obtain this calendar table or this week's lessons"
        );
        return;
    }

    if (!Array.isArray(lessons) || !lessonsAvailable) {
        console.warn("Invalid or missing lessons data");
        calendarBody.innerHTML =
            "<tr><td colspan='6' class='error-text'><strong>Keine Nachhilfestunden verfügbar</strong></td></tr>";
        return;
    }

    // Clear calendar body
    calendarBody.innerHTML = "";

    // Setup weekdays and header
    const weekdays = [
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
    ];
    const days = ["Uhrzeit", ...weekdays];

    const headerRow = document.createElement("tr");
    days.forEach((day) => {
        const th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    });
    calendarBody.appendChild(headerRow);

    // Populate rows for each time slot
    for (let i = 0; i < lessonStartTimes.length; i++) {
        const row = document.createElement("tr");
        calendarBody.appendChild(row);

        for (let j = 0; j < days.length; j++) {
            const cell = document.createElement("td");
            if (j === 0) {
                cell.textContent = lessonStartTimes[i].time;
            } else {
                // Calculate the date for this column (weekday)
                const columnDate = addDaysToDate(
                    getWeekStartAndEndDates(week).split(" - ")[0].slice(1),
                    j - 1
                );
                // Find lesson matching this date and time
                const lesson = lessons.find(
                    (l) =>
                        l.date.split("T")[0] === columnDate &&
                        l.start_time.time === lessonStartTimes[i].time
                );
                if (lesson) {
                    switch (lesson.status.id) {
                        case 1:
                        case 2:
                            cell.textContent = "frei";
                            cell.classList.add("free");
                            break;
                        case 3:
                            cell.textContent = "belegt";
                            cell.classList.add("accepted");
                            break;
                    }
                    cell.classList.add("lesson-cell");
                }
            }
            row.appendChild(cell);
        }
    }
}

// Returns a formatted string with the start and end dates of the week
function getWeekStartAndEndDates(weekId, year = new Date().getFullYear()) {
    const firstDayOfYear = new Date(year, 0, 1);
    const dayOfWeek = firstDayOfYear.getDay();
    const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const startDate = new Date(firstDayOfYear);
    startDate.setDate(firstDayOfYear.getDate() + (weekId - 1) * 7 - offset);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return `(${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})`;
}

// Returns an arrays of all days on which there are lessons in the next three weeks
function getLessonDays(lessons) {
    if (lessons && Array.isArray(lessons) && lessons.length > 0) {
        return [
            ...lessons.map((lesson) =>
                new Date(lesson.date).toLocaleDateString()
            ),
        ];
    }
}

function populateLessonRequestForm() {
    const form = document.getElementById("lesson-request-form");
    if (form) {
        lessons = getLessonDays(next3WeeksLessons);
        if (lessons && Array.isArray(lessons) && lessons.length > 0) {
            // Populate the date picker with available lesson dates
            const datePicker = form.querySelector("#lesson-request-form-date");
            lessons.forEach((date) => {
                const option = document.createElement("option");
                option.value = date;
                option.textContent = date;
                datePicker.appendChild(option);
            });
        }

        const subjectPicker = form.querySelector(
            "#lesson-request-form-subject"
        );
        if (subjectPicker) {
            if (
                !subjectsAvailable ||
                !subjects ||
                Array.isArray(subjects) ||
                subjects.length === 0
            ) {
                const option = document.createElement("option");
                option.value = "";
                option.textContent = "Keine Fächer verfügbar";
                option.classList.add("error-text");
                subjectPicker.appendChild(option);
            } else {
                Object.keys(subjects).forEach((subjectId) => {
                    const option = document.createElement("option");
                    option.value = subjectId;
                    option.textContent = subjects[subjectId].name;
                    subjectPicker.appendChild(option);
                });
            }
        }

        const timePicker = form.querySelector("#lesson-request-form-time");
        if (timePicker) {
            const datePicker = document.querySelector(
                "#lesson-request-form-date"
            );
            if (datePicker && datePicker.value) {
                const date = new Date(datePicker.value);

                if (
                    next3WeeksLessons &&
                    lessonsAvailable &&
                    Array.isArray(next3WeeksLessons) &&
                    next3WeeksLessons.length > 0
                ) {
                    next3WeeksLessons.forEach((lesson) => {
                        if (lesson.date === date) {
                            const option = document.createElement("option");
                            option.value = lesson.start_time;
                            option.textContent = lesson.start_time;
                            timePicker.appendChild(option);
                        }
                    });
                }
            }
        }
    }
}
