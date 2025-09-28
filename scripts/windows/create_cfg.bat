@echo off
set "CFG_FILE=server\config.json"

IF EXIST "%CFG_FILE%" (
    set /p ANSWER="%CFG_FILE% already exists. Do you want to overwrite it with the default values? [N/y]: "

    IF /I NOT "%ANSWER%" == "y" (
        exit /b 0
    ) ELSE (
        GOTO :writecfg
    )
) ELSE (
    GOTO :writecfg
)

:writecfg
(
echo {
echo     "smtp": {
echo         "domain": "smtp.example.com",
echo         "user": "user@example.com", 
echo         "password": "password"
echo     },
echo     "notifications": {
echo         "admin_email": "admin@example.com",
echo         "enable_notifications": true,
echo         "enable_admin_notifications": true,
echo         "contact_request": {
echo             "user_subject": "Thank you for your request",
echo             "admin_subject": "New contact request message",
echo             "user_body": "We have received your request and will get back to you shortly.",
echo             "admin_body": "You have received a new contact request. Please check the admin panel for details."
echo         },
echo         "lesson_request": {
echo             "user_subject": "Thank you for your lesson request",
echo             "admin_subject": "New lesson request message",
echo             "user_body": "We have received your lesson request and will get back to you shortly.",
echo             "admin_body": "You have received a new lesson request. Please check the admin panel for details."
echo         }
echo     },
echo     "lesson_start_times": {
echo         "0": "08:00",
echo         "1": "08:55",
echo         "2": "10:00",
echo         "3": "10:55",
echo         "4": "11:50",
echo         "5": "12:45",
echo         "6": "13:40",
echo         "7": "14:35",
echo         "8": "15:30",
echo         "9": "16:25"
echo     },
echo     "subjects" : {
echo         "0": {
echo             "name": "Mathematics",
echo             "short_cut": "MATH",
echo             "description": "Mathematics is the study of numbers, shapes, and patterns."
echo         },
echo         "1": {
echo             "name": "Physics",
echo             "short_cut": "PHYS",
echo             "description": "Physics is the study of matter, energy, and the fundamental forces of nature."
echo         },
echo         "2": {
echo             "name": "Chemistry",
echo             "short_cut": "CHEM",
echo             "description": "Chemistry is the study of substances, their properties, and how they interact."
echo         },
echo         "3": {
echo             "name": "Biology",
echo             "short_cut": "BIO",
echo             "description": "Biology is the study of living organisms and their interactions with the environment."
echo         },
echo         "4": {
echo             "name": "English",
echo             "short_cut": "ENG",
echo             "description": "English is the study of the English language, literature, and communication skills."
echo         },
echo         "5": {
echo             "name": "History",      
echo             "short_cut": "HIST",
echo             "description": "History is the study of past events, particularly in human affairs."
echo         },
echo         "6": {
echo             "name": "Geography",
echo             "short_cut": "GEO",
echo             "description": "Geography is the study of places and the relationships between people and their environments."
echo         },
echo         "7": {
echo             "name": "Computer Science",
echo             "short_cut": "CS",
echo             "description": "Computer Science is the study of computers and computational systems."
echo         }
echo     }
echo }
) > "%CFG_FILE%"