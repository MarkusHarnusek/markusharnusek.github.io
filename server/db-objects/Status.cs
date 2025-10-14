namespace server;

/// <summary>
/// Represents the status of a lesson.
/// </summary>
public class Status
{
    /// <summary>
    /// The unique identifier for the status.
    /// </summary>
    public int id { get; }
    /// <summary>
    /// The name of the status.
    /// </summary>
    public string name { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Status"/> class with the specified details.
    /// </summary>
    /// <param name="id">The id of the status.</param>
    /// <param name="name">The name of the status.</param>
    public Status(int id, string name)
    {
        this.id = id;
        this.name = name;
    }
}