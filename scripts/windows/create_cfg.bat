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
echo   "smtp": {
echo     "domain": "smtp.example.com",
echo     "user": "user@example.com",
echo     "password": "password"
echo   },
echo   "notification": {
echo     "admin_email": "admin@example.com",
echo     "enable_notifications": true,
echo     "enable_admin_notifications": true,
echo     "contact_response": {
echo       "user_subject": "User Subject",
echo       "admin_message": "Admin Message",
echo       "user_body": "User Body",
echo       "admin_subject": "Admin Subject"
echo     },
echo     "lesson_request_response": {
echo       "user_subject": "Lesson Request Subject",
echo       "admin_message": "Lesson Request Admin Message",
echo       "user_body": "Lesson Request User Body",
echo       "admin_subject": "Lesson Request Admin Subject"
echo     },
echo     "lesson_acceptance_response": {
echo       "user_subject": "Lesson Acceptance Subject",
echo       "admin_message": "Lesson Acceptance Admin Message",
echo       "user_body": "Lesson Acceptance User Body",
echo       "admin_subject": "Lesson Acceptance Admin Subject"
echo     }
echo   },
echo   "startTimes": [
echo     {
echo       "id": 1,
echo       "time": "09:00"
echo     },
echo     {
echo       "id": 2,
echo       "time": "10:00"
echo     },
echo     {
echo       "id": 3,
echo       "time": "11:00"
echo     }
echo   ],
echo   "subjects": [
echo     {
echo       "id": 1,
echo       "name": "Mathematics",
echo       "shortcut": "MATH",
echo       "teacher": "John Doe",
echo       "description": "Math is just numbers and letters."
echo     },
echo     {
echo       "id": 2,
echo       "name": "Physics",
echo       "shortcut": "PHY",
echo       "teacher": "John Doe",
echo       "description": "Physics is when you drop an apple."
echo     }
echo   ]
echo }
) > "%CFG_FILE%"