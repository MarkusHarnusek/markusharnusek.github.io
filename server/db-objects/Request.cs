namespace server;

/// <summary>
/// Represents a generic request in the tutoring system.
/// </summary>
public class Request
{
    /// <summary>
    /// The unique identifier for the request.
    /// </summary>
    public int id { get; }
    /// <summary>
    /// The IP address from which the request originated.
    /// </summary>
    public string ip { get; }
    /// <summary>
    /// The timestamp when the request was made.
    /// </summary>
    public DateTime timestamp { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Request"/> class with the specified details.
    /// </summary>
    /// <param name="id">The unique identifier for the request.</param>
    /// <param name="ip">The IP address from which the request originated.</param>
    /// <param name="timestamp">The timestamp when the request was made.</param>
    public Request(int id, string ip, DateTime timestamp)
    {
        this.id = id;
        this.ip = ip;
        this.timestamp = timestamp;
    }
}