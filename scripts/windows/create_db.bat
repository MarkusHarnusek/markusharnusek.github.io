@echo off

:: Check if sqlite3 is installed
where sqlite3 >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo sqlite3 could not be found. Please install it first.
    exit /b 1
)

:: Database file name
set DB_FILE=..\\..\\tutoring.db

:: Remove existing database file if it exists
if exist "%DB_FILE%" (
    del "%DB_FILE%"
)

:: Create and populate the database
echo -- Create Tables> temp.sql
echo CREATE TABLE SUBJECT (>> temp.sql
echo     id INTEGER PRIMARY KEY AUTOINCREMENT,>> temp.sql
echo     name TEXT NOT NULL,>> temp.sql
echo     short TEXT NOT NULL,>> temp.sql
echo     teacher TEXT NOT NULL,>> temp.sql
echo     description TEXT NOT NULL>> temp.sql
echo );>> temp.sql
echo.>> temp.sql
echo CREATE TABLE STUDENT (>> temp.sql
echo     id INTEGER PRIMARY KEY AUTOINCREMENT,>> temp.sql
echo     first_name TEXT NOT NULL,>> temp.sql
echo     last_name TEXT NOT NULL,>> temp.sql
echo     student_class TEXT,>> temp.sql
echo     email_address TEXT NOT NULL UNIQUE>> temp.sql
echo );>> temp.sql
echo.>> temp.sql
echo CREATE TABLE STATUS (>> temp.sql
echo     id INTEGER PRIMARY KEY AUTOINCREMENT,>> temp.sql
echo     name TEXT NOT NULL>> temp.sql
echo );>> temp.sql
echo.>> temp.sql
echo CREATE TABLE LESSON (>> temp.sql
echo     id INTEGER PRIMARY KEY AUTOINCREMENT,>> temp.sql
echo     date DATETIME NOT NULL,>> temp.sql
echo     start_time_id INTEGER,>> temp.sql
echo     subject_id INTEGER,>> temp.sql
echo     student_id INTEGER,>> temp.sql
echo     status_id INTEGER,>> temp.sql
echo     FOREIGN KEY (start_time_id) REFERENCES START_TIME(id),>> temp.sql
echo     FOREIGN KEY (subject_id) REFERENCES SUBJECT(id),>> temp.sql
echo     FOREIGN KEY (student_id) REFERENCES STUDENT(id),>> temp.sql
echo     FOREIGN KEY (status_id) REFERENCES STATUS(id)>> temp.sql
echo );>> temp.sql
echo.>> temp.sql
echo CREATE TABLE MESSAGE (>> temp.sql
echo     id INTEGER PRIMARY KEY AUTOINCREMENT,>> temp.sql
echo     student_id INTEGER,>> temp.sql
echo     lesson_id INTEGER,>> temp.sql
echo     title TEXT,>> temp.sql
echo     body TEXT NOT NULL,>> temp.sql
echo     FOREIGN KEY (student_id) REFERENCES STUDENT(id),>> temp.sql
echo     FOREIGN KEY (lesson_id) REFERENCES LESSON(id)>> temp.sql
echo );>> temp.sql
echo.>> temp.sql
echo CREATE TABLE REQUEST (>> temp.sql
echo     id INTEGER PRIMARY KEY AUTOINCREMENT,>> temp.sql
echo     ip TEXT NOT NULL,>> temp.sql
echo     time DATETIME NOT NULL>> temp.sql
echo );>> temp.sql
echo.>> temp.sql
echo CREATE TABLE START_TIME (>> temp.sql
echo     id INTEGER PRIMARY KEY AUTOINCREMENT,>> temp.sql
echo     time TEXT NOT NULL>> temp.sql
echo );>> temp.sql
echo.>> temp.sql
echo -- Insert default data for SUBJECT>> temp.sql
echo INSERT INTO SUBJECT (name, short, teacher, description) VALUES>> temp.sql
echo     ('Angewandte Mathematik', 'AM', 'POVACZ Katharina', 'Ich helfe dir, mathematische Konzepte - ob Mengenlehre, Lineare Algebra oder Gleichungen - zu verstehen und anzuwenden.'),>> temp.sql
echo     ('Physik', 'NWP', 'GRUBER Markus', 'Physik ist die Grundlage fur viele technische Facher. Ich unterstutze dich dabei die Theorie zu verstehen und sie in praktischen Anwendungen und Aufgaben umzusetzen um dich bestmoglich auf die Prufungen vorzubereiten.'),>> temp.sql
echo     ('Programmieren und Software Engineering', 'POSE', 'KERN Adrian', 'Programmieren ist meine Leidenschaft. Seit kleinauf beschaftige ich mich mit Softwareentwicklung und bringe dir die Konzepte verstandlich naher.'),>> temp.sql
echo     ('Rechnungswesen', 'BWMRW', 'ARZT Miriam', 'Rechnungswesen ist ein wichtiges Fach fur die wirtschaftliche Ausbildung. Ob einfache Haushaltsbucher, uber Belege, bis hin zur doppelten Buchhaltung, helfe ich dir beim Lernen.'),>> temp.sql
echo     ('Betriebsorganisation', 'BWMBO', 'ARZT Miriam', 'Betriebsorganisation ist entscheidend fur das Verstandnis von Unternehmensstrukturen. Ich unterstutze dich dabei, die Ablaufe - Von den Grundlagen bis zu komplexeren Themen wie Arbeitsvertragen - zu verstehen.');>> temp.sql
echo.>> temp.sql
echo -- Insert default data for STATUS>> temp.sql
echo INSERT INTO STATUS (name) VALUES>> temp.sql
echo     ('free'),>> temp.sql
echo     ('pending'),>> temp.sql
echo     ('accepted');>> temp.sql
echo.>> temp.sql
echo -- Insert default data for START_TIME>> temp.sql
echo INSERT INTO START_TIME (time) VALUES>> temp.sql
echo     ('08:00'),>> temp.sql
echo     ('08:55'),>> temp.sql
echo     ('10:00'),>> temp.sql
echo     ('10:55'),>> temp.sql
echo     ('11:50'),>> temp.sql
echo     ('12:45'),>> temp.sql
echo     ('13:40'),>> temp.sql
echo     ('14:35'),>> temp.sql
echo     ('15:30'),>> temp.sql
echo     ('16:25');>> temp.sql

:: Execute the SQL commands
sqlite3 "%DB_FILE%" < temp.sql

:: Clean up temporary SQL file
del temp.sql

echo Database %DB_FILE% created successfully with all tables and default data.
pause