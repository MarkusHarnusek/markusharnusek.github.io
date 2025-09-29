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
    public Request contact_request { get; }
    /// <summary>
    /// Configuration settings for lesson request notifications.
    /// </summary>
    public Request lesson_request { get; }

    /// <summary>
    /// Constructor to initialize the Notification configuration settings.
    /// </summary>
    /// <param name="admin_email">The email address of the administrator to receive notifications.</param>
    /// <param name="enable_notifications">Indicates whether notifications are enabled.</param>
    /// <param name="enable_admin_notifications">Indicates whether admin notifications are enabled.</param>
    public Notification(string admin_email, bool enable_notifications, bool enable_admin_notifications, Request contact_request, Request lesson_request)
    {
        this.admin_email = admin_email;
        this.enable_notifications = enable_notifications;
        this.enable_admin_notifications = enable_admin_notifications;
        this.contact_request = contact_request;
        this.lesson_request = lesson_request;
    }
}