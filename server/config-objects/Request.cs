/// <summary>
/// Configuration settings for request-related notifications.
/// </summary>
public class Request
{
    /// <summary>
    /// The email address from which notifications are sent.
    /// </summary>
    string user_subject { get; }
    /// <summary>
    /// The body of the email sent to the user.
    /// </summary>
    string admin_message { get; }
    /// <summary>
    /// The subject of the email sent to the admin.
    /// </summary>
    string user_body { get; }
    /// <summary>
    /// The body of the email sent to the admin.
    /// </summary>
    string admin_subject { get; }

    /// <summary>
    /// Constructor to initialize the Request configuration settings.
    /// </summary>
    /// <param name="user_subject">The subject of the email sent to the user.</param>
    /// <param name="admin_message">The body of the email sent to the admin.</param>
    /// <param name="user_body">The body of the email sent to the user.</param>
    /// <param name="admin_subject">The subject of the email sent to the admin.</param>
    public Request(string user_subject, string admin_message, string user_body, string admin_subject)
    {
        this.user_subject = user_subject;
        this.admin_message = admin_message;
        this.user_body = user_body;
        this.admin_subject = admin_subject;
    }
}