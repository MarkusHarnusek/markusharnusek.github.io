@echo off

:: Check if sqlite3 is installed
where sqlite3 >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo sqlite3 could not be found. Please install it first.
    exit /b 1
)

:: Database file name
set DB_FILE=server\tutoring.db

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
echo     start_time_id INTEGER,>> temp.sql
echo     date DATETIME NOT NULL,>> temp.sql
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
echo -- Insert default data for STATUS>> temp.sql
echo INSERT INTO STATUS (name) VALUES>> temp.sql
echo     ('free'),>> temp.sql
echo     ('pending'),>> temp.sql
echo     ('accepted');>> temp.sql
echo.>> temp.sql

:: Execute the SQL commands
sqlite3 "%DB_FILE%" < temp.sql

:: Clean up temporary SQL file
del temp.sql

echo Database %DB_FILE% created successfully with all tables and default data.
pause