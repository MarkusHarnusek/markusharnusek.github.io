# Configuration

The configuration for the Tutoring Platform is found in the `server/config.json` file.

## Creating the config file

The config file can be created using the `create_cfg` script found in the `script` directory.

## Configuration the behavior

This part contains an explanation for each setting in the config file.
The config file is spilt into multiple parts to keep the file structured.

### SMTP config

The `smtp` part contains informations about the smtp client used to send EMails.

 - `domain`: The domain for the smtp client.
 - `user`: The username for the smmtp clients EMail account.
 - `password`: The password for the smtp clients EMail account (With most domains an app password is needed).

### Notifications

The `notifications` part contains settings and configurations for the notications.

 - `admin-email`: The mail all administrative emails get sent to.
 - `enable_notifications`: Indicates wether EMail notifications are to be sent.
 - `enable_admin_notifications`: Indicates wether the admin shall be notified via EMail.
 - `contact_response`: Contains confiurations for user side contact request notifications:
    - `user_subject`: The subject of the user contact request confirmation EMail.
    - `admin_subject`: The subject of the admin contact request notification EMail.
    - `user_body`: The body of the user contact request confirmation EMail.
    - `admin_body`: The body of the admin contact request notification EMail.
  - `lesson_request_response`: Contains confiurations for user side lesson request notifications:
    - `user_subject`: The subject of the user lesson request confirmation EMail.
    - `admin_subject`: The subject of the admin lesson request notification EMail.
    - `user_body`: The body of the user lesson request confirmation EMail.
    - `admin_body`: The body of the admin lesson request notification EMail.
  - `lesson_acceptance_response`: Contains confiurations for user side lesson acceptance notifications:
    - `user_subject`: The subject of the user lesson request confirmation EMail.
    - `admin_subject`: The subject of the admin lesson request notification EMail.
    - `user_body`: The body of the user lesson request confirmation EMail.
    - `admin_body`: The body of the admin lesson request notification EMail.

### Lesson Start Times

The `lesson_start_times` part contains a list of all lesson start times in the following format: `"<id>": "<hh>:<mm>"`

### Subjects 

The `subjects` part contains a list of all subjects being taught by the tutor in the following format:
    `"<id>": {
        "name": "<the name of the subject>",
        "short_cut": "<the shortcut of the subject>",
        "description": "<the desciption of the subject to be displayed on the website>"
    }`

## Using References

Notifications can be configured to use references. References start with the character `$` and is followed by a single case sensitive character identifier. Note that therefore the character `$` is reserved and might cause issues if used unintendedly.

### References

 - `$0`: First name of the targeted user.
 - `$1`: Last name of the targeted user.
 - `$2`: EMail address of the targeted user.
 - `$3`: Student class of the targeted user.
 - `$4`: The body of the contact request.
 - `$5`: The date of the requested lesson in the format `dd.mm.yyyy`.
 - `$6`: The start time string of the requested lesson.
 - `$7`: The subject (name) requested by the user