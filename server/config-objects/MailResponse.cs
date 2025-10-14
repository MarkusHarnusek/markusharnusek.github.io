/// <summary>
/// Configuration settings for request-related notifications.
/// </summary>
public class MailResponse
{
    /// <summary>
    /// The email address from which notifications are sent.
    /// </summary>
    public string user_subject { get; }
    /// <summary>
    /// The body of the email sent to the user.
    /// </summary>
    public string admin_subject { get; }
    /// <summary>
    /// The subject of the email sent to the admin.
    /// </summary>
    public string user_body { get; }
    /// <summary>
    /// The body of the email sent to the admin.
    /// </summary>
    public string admin_body { get; }

    /// <summary>
    /// Constructor to initialize the Request configuration settings.
    /// </summary>
    /// <param name="user_subject">The subject of the email sent to the user.</param>
    /// <param name="admin_message">The body of the email sent to the admin.</param>
    /// <param name="user_body">The body of the email sent to the user.</param>
    /// <param name="admin_subject">The subject of the email sent to the admin.</param>
    public MailResponse(string user_subject, string admin_subject, string user_body, string admin_body)
    {
        this.user_subject = user_subject;
        this.admin_subject = admin_subject;
        this.user_body = user_body;
        this.admin_body = admin_body;
    }
}