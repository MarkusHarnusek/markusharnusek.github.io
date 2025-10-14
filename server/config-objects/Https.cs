namespace server;

/// <summary>
/// Configuration settings for HTTPS server.
/// </summary>
public class Https
{
    /// <summary>
    /// Indicates whether HTTPS is enabled.
    /// </summary>
    public bool enabled { get; }
    /// <summary>
    /// The file path to the SSL certificate.
    /// </summary>
    public string certificate_path { get; }
    /// <summary>
    /// The file path to the SSL key.
    /// </summary>
    public string key_path { get; }

    /// <summary>
    /// Constructor to initialize the HTTPS configuration settings.
    /// </summary>
    /// <param name="enabled">Indicates whether HTTPS is enabled.</param>
    /// <param name="certificate_path">The file path to the SSL certificate.</param>
    /// <param name="key_path">The file path to the SSL key.</param>
    public Https(bool enabled, string certificate_path, string key_path)
    {
        this.enabled = enabled;
        this.certificate_path = certificate_path;
        this.key_path = key_path;
    }
}