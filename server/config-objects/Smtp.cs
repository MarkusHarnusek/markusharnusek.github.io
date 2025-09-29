namespace server;

/// <summary>
/// Configuration settings for SMTP server.
/// </summary>
public class Smtp
{
    /// <summary>
    /// The SMTP server domain.
    /// </summary>
    public string domain { get; }
    /// <summary>
    /// The SMTP user name.
    /// </summary>
    public string user { get; }
    /// <summary>
    /// The SMTP user password.
    /// </summary>
    public string password { get; }

    /// <summary>
    /// Constructor to initialize the SMTP configuration settings.
    /// </summary>
    /// <param name="domain">The SMTP server domain.</param>
    /// <param name="user">The SMTP user name.</param>
    /// <param name="password">The SMTP user password.</param>
    public Smtp(string domain, string user, string password)
    {
        this.domain = domain;
        this.user = user;
        this.password = password;
    }
}