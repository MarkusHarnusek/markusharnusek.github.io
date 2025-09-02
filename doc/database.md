# Database Documentation
This document contains documentation on the schemes of the database and the "read-only" tables
## Tables
### Subject
    CREATE TABLE SUBJECT (
        id INTEGER PRIMARY KEY UNIQUE AUTOINCREMENT,
        name TEXT NOT NULL,
        short TEXT NOT NULL,
        teacher TEXT NOT NULL,
        description TEXT NOT NULL
    );

### Student

    CREATE TABLE STUDENT (
        id INTEGER PRIMARY KEY UNIQUE AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        student_class TEXT,
        email_address TEXT NOT NULL UNIQUE
    );

### Status

    CREATE TABLE STATUS (
        id INTEGER PRIMARY KEY UNIQUE AUTOINCREMENT,
        name TEXT NOT NULL
    );

### Lesson

    CREATE TABLE LESSON (
        id INTEGER PRIMARY KEY UNIQUE AUTOINCREMENT,
        start_time DATETIME NOT NULL,
        end_time DATETIME NOT NULL,
        subject_id INTEGER,
        student_id INTEGER,
        status_id INTEGER,
        FOREIGN KEY (subject_id) REFERENCES SUBJECT(id),
        FOREIGN KEY (student_id) REFERENCES STUDENT(id),
        FOREIGN KEY (status_id) REFERENCES STATUS(id)
    );

### Message

    CREATE TABLE MESSAGE (
        id INTEGER PRIMARY KEY UNIQUE AUTOINCREMENT,
        student_id INTEGER,
        lesson_id INTEGER,
        title TEXT,
        body TEXT NOT NULL,
        FOREIGN KEY (student_id) REFERENCES STUDENT(id),
        FOREIGN KEY (lesson_id) REFERENCES LESSON(id)
    );

### Request

    CREATE TABLE REQUEST (
        id INTEGER PRIMARY KEY UNIQUE AUTOINCREMENT,
        ip TEXT NOT NULL,
        time DATETIEM NOT NULL
    );

## Read-only default inserts

### Subject

    INSERT INTO SUBJECT("Angewandte Mathematik", "AM", "POVACZ Katharina", "Ich helfe dir, mathematische Konzepte - ob Mengenlehre, Lineare Algebra oder Gleichungen - zu verstehen und anzuwenden.")
    INSERT INTO SUBJECT("Physik", "NWP", "GRUBER Markus", "Physik ist die Grundlage für viele technische Fächer. Ich unterstütze dich dabei die Theorie zu verstehen und sie in praktischen Anwendungen und Aufgaben umzusetzen um dich bestmöglich auf die Prüfungen vorzubereiten.")
    INSERT INTO SUBJECT("Programmieren und Software Engineering", "POSE", "KERN Adrian", "Programmieren ist meine Leidenschaft. Seit kleinauf beschäftige ich mich mit Softwareentwicklung und bringe dir die Konzepte verständlich näher.")
    INSERT INTO SUBJECT("Rechnungswesen", "BWMRW", "ARZT Miriam", "Rechnungswesen ist ein wichtiges Fach für die wirtschaftliche Ausbildung. Ob einfache Haushaltsbücher, über Belege, bis hin zur doppelten Buchhaltung, helfe ich dir beim Lernen.")
    INSERT INTO SUBJECT("Betriebsorganisation", "BWMBO", "ARZT Miriam", "Betriebsorganisation ist entscheidend für das Verständnis von Unternehmensstrukturen. Ich unterstütze dich dabei, die Abläufe - Von den Grundlagen bis zu komplexeren Themen wie Arbeitsverträgen - zu verstehen.")


### Status

    INSERT INTO STATUS("free")
    INSERT INTO STATUS("pending")
    INSERT INTO STATUS("accepted")