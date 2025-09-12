#!/bin/bash

# Check if sqlite3 is installed
if ! command -v sqlite3 &> /dev/null
then
    echo "sqlite3 could not be found. Please install it first."
    exit 1
fi

# Database file name
HOME_DIR="../../"
DB_FILE="${HOME_DIR}/server/tutoring.db"

# Remove existing database file if it exists
if [ -f "$DB_FILE" ]; then
    rm "$DB_FILE"
fi

# Create and populate the database
sqlite3 "$DB_FILE" <<EOF
-- Create Tables
CREATE TABLE SUBJECT (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    short TEXT NOT NULL,
    teacher TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE STUDENT (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    student_class TEXT,
    email_address TEXT NOT NULL UNIQUE
);

CREATE TABLE STATUS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE LESSON (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATETIME NOT NULL,
    start_time_id INTEGER,
    subject_id INTEGER,
    student_id INTEGER,
    status_id INTEGER,
    FOREIGN KEY (start_time_id) REFERENCES START_TIME(id), 
    FOREIGN KEY (subject_id) REFERENCES SUBJECT(id),
    FOREIGN KEY (student_id) REFERENCES STUDENT(id),
    FOREIGN KEY (status_id) REFERENCES STATUS(id)
);

CREATE TABLE MESSAGE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    lesson_id INTEGER,
    title TEXT,
    body TEXT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES STUDENT(id),
    FOREIGN KEY (lesson_id) REFERENCES LESSON(id)
);

CREATE TABLE REQUEST (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL,
    time DATETIME NOT NULL
);

CREATE TABLE START_TIME (
    id INTEGER PRIMARY KEY  AUTOINCREMENT,
    time TEXT NOT NULL
);

-- Insert default data for SUBJECT
INSERT INTO SUBJECT (name, short, teacher, description) VALUES
    ('Angewandte Mathematik', 'AM', 'POVACZ Katharina', 'Ich helfe dir, mathematische Konzepte - ob Mengenlehre, Lineare Algebra oder Gleichungen - zu verstehen und anzuwenden.'),
    ('Physik', 'NWP', 'GRUBER Markus', 'Physik ist die Grundlage für viele technische Fächer. Ich unterstütze dich dabei die Theorie zu verstehen und sie in praktischen Anwendungen und Aufgaben umzusetzen um dich bestmöglich auf die Prüfungen vorzubereiten.'),
    ('Programmieren und Software Engineering', 'POSE', 'KERN Adrian', 'Programmieren ist meine Leidenschaft. Seit kleinauf beschäftige ich mich mit Softwareentwicklung und bringe dir die Konzepte verständlich näher.'),
    ('Rechnungswesen', 'BWMRW', 'ARZT Miriam', 'Rechnungswesen ist ein wichtiges Fach für die wirtschaftliche Ausbildung. Ob einfache Haushaltsbücher, über Belege, bis hin zur doppelten Buchhaltung, helfe ich dir beim Lernen.'),
    ('Betriebsorganisation', 'BWMBO', 'ARZT Miriam', 'Betriebsorganisation ist entscheidend für das Verständnis von Unternehmensstrukturen. Ich unterstütze dich dabei, die Abläufe - Von den Grundlagen bis zu komplexeren Themen wie Arbeitsverträgen - zu verstehen.');

-- Insert default data for STATUS
INSERT INTO STATUS (name) VALUES
    ('free'),
    ('pending'),
    ('accepted');

-- Insert default data for START_TIME
INSERT INTO START_TIME (time) VALUES
    ('08:00'),
    ('08:55'),
    ('10:00'),
    ('10:55'),
    ('11:50'),
    ('12:45'),
    ('13:40'),
    ('14:35'),
    ('15:30'),
    ('16:25');

EOF

echo "Database $DB_FILE created successfully with all tables and default data."