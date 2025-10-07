CFG_FILE="server/config.json"

if [ -f "$CFG_FILE" ]; then
    echo "$CFG_FILE already exists. Do you want to overwrite it with the default values? [N|y]"
    read -r ANSWER

    if [ "$ANSWER" != "y" ]; then
        exit 0
    fi
fi

cat > $CFG_FILE << EOL
{
  "smtp": {
    "domain": "smtp.example.com",
    "user": "user@example.com",
    "password": "password"
  },
  "https": {
    "enabled": true,
    "certificate-path": "./certs/dev-cert.pem",
    "key-path": "./certs/dev-key.pem"
  },
  "notification": {
    "admin_email": "admin@example.com",
    "enable_notifications": true,
    "enable_admin_notifications": true,
    "contact_response": {
      "user_subject": "User Subject",
      "admin_subject": "Admin Subject",
      "user_body": "User Body",
      "admin_body": "Admin Body"
    },
    "lesson_request_response": {
      "user_subject": "Lesson Request Subject",
      "admin_subject": "Lesson Request Admin Subject",
      "user_body": "Lesson Request User Body",
      "admin_body": "Lesson Request Admin Body"
    },
    "lesson_acceptance_response": {
      "user_subject": "Lesson Acceptance Subject",
      "admin_subject": "Lesson Acceptance Admin Subject",
      "user_body": "Lesson Acceptance User Body",
      "admin_body": "Lesson Acceptance Admin Body"
    }
  },
  "startTimes": [
    {
      "id": 1,
      "time": "09:00"
    },
    {
      "id": 2,
      "time": "10:00"
    },
    {
      "id": 3,
      "time": "11:00"
    }
  ],
  "subjects": [
    {
      "id": 1,
      "name": "Mathematics",
      "shortcut": "MATH",
      "teacher": "John Doe",
      "description": "Math is just numbers and letters."
    },
    {
      "id": 2,
      "name": "Physics",
      "shortcut": "PHY",
      "teacher": "John Doe",
      "description": "Physics is when you drop an apple."
    }
  ]
}