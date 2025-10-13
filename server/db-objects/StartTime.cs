namespace server;


/// <summary>
/// Represents a start time for lessons.
/// </summary>
public class StartTime
{
    /// <summary>
    /// The unique identifier for the start time.
    /// </summary>
    public int id { get; }
    /// <summary>
    /// The time in HH:mm format.
    /// </summary>
    public string time { get; set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="StartTime"/> class with the specified details.
    /// </summary>
    /// <param name="id">The id of the start time.</param>
    /// <param name="time">The time in HH:mm format.</param>
    public StartTime(int id, string time)
    {
        this.id = id;
        this.time = time;
    }
}