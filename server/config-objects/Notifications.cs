namespace server;

/// <summary>
/// Configuration settings for notification-related features.
/// </summary>
public class Notification
{
    /// <summary>
    /// The email address of the administrator to receive notifications.
    /// </summary>
    public string admin_email { get; }
    /// <summary>
    /// Indicates whether notifications are enabled.
    /// </summary>
    public bool enable_notifications { get; }
    /// <summary>
    /// Indicates whether admin notifications are enabled.
    /// </summary>
    public bool enable_admin_notifications { get; }
    /// <summary>
    /// Configuration settings for contact request notifications.
    /// </summary>
    public MailResponse contact_response { get; }
    /// <summary>
    /// Configuration settings for lesson request notifications.
    /// </summary>
    public MailResponse lesson_request_response { get; }
    /// <summary>
    /// Configuration settings for lesson acceptance notifications.
    /// </summary>
    public MailResponse lesson_acceptance_response { get; }

    /// <summary>
    /// Constructor to initialize the Notification configuration settings.
    /// </summary>
    /// <param name="admin_email">The email address of the administrator to receive notifications.</param>
    /// <param name="enable_notifications">Indicates whether notifications are enabled.</param>
    /// <param name="enable_admin_notifications">Indicates whether admin notifications are enabled.</param>
    public Notification(string admin_email, bool enable_notifications, bool enable_admin_notifications, MailResponse contact_response, MailResponse lesson_request_response, MailResponse lesson_acceptance_response)
    {
        this.admin_email = admin_email;
        this.enable_notifications = enable_notifications;
        this.enable_admin_notifications = enable_admin_notifications;
        this.contact_response = contact_response;
        this.lesson_request_response = lesson_request_response;
        this.lesson_acceptance_response = lesson_acceptance_response;
    }
}