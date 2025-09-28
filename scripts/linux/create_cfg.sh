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
    "notifications": {
        "admin_email": "admin@example.com",
        "enable_notifications": true,
        "enable_admin_notifications": true,
        "contact_request": {
            "user_subject": "Thank you for your request",
            "admin_subject": "New contact request message",
            "user_body": "We have received your request and will get back to you shortly.",
            "admin_body": "You have received a new contact request. Please check the admin panel for details."
        },
        "lesson_request": {
            "user_subject": "Thank you for your lesson request",
            "admin_subject": "New lesson request message",
            "user_body": "We have received your lesson request and will get back to you shortly.",
            "admin_body": "You have received a new lesson request. Please check the admin panel for details."
        }
    },
    "lesson_start_times": {
        "0": "08:00",
        "1": "08:55",
        "2": "10:00",
        "3": "10:55",
        "4": "11:50",
        "5": "12:45",
        "6": "13:40",
        "7": "14:35",
        "8": "15:30",
        "9": "16:25"
    },
    "subjects" : {
        "0": {
            "name": "Mathematics",
            "short_cut": "MATH",
            "description": "Mathematics is the study of numbers, shapes, and patterns."
        },
        "1": {
            "name": "Physics",
            "short_cut": "PHYS",
            "description": "Physics is the study of matter, energy, and the fundamental forces of nature."
        },
        "2": {
            "name": "Chemistry",
            "short_cut": "CHEM",
            "description": "Chemistry is the study of substances, their properties, and how they interact."
        },
        "3": {
            "name": "Biology",
            "short_cut": "BIO",
            "description": "Biology is the study of living organisms and their interactions with the environment."
        },
        "4": {
            "name": "English",
            "short_cut": "ENG",
            "description": "English is the study of the English language, literature, and communication skills."
        },
        "5": {
            "name": "History",      
            "short_cut": "HIST",
            "description": "History is the study of past events, particularly in human affairs."
        },
        "6": {
            "name": "Geography",
            "short_cut": "GEO",
            "description": "Geography is the study of places and the relationships between people and their environments."
        },
        "7": {
            "name": "Computer Science",
            "short_cut": "CS",
            "description": "Computer Science is the study of computers and computational systems."
        }
    }
}