namespace server;

/// <summary>
/// Configuration settings for lesson start times.
/// </summary>
public class LessonStartTimes
{
    /// <summary>
    /// The unique identifier for the lesson start time.
    /// </summary>
    public int id { get; }
    /// <summary>
    /// The time string representing the lesson start time.
    /// </summary>
    public string time_string { get; }

    /// <summary>
    /// Constructor to initialize the LessonStartTimes configuration settings.
    /// </summary>
    /// <param name="id">The unique identifier for the lesson start time.</param>
    /// <param name="time_string">The time string representing the lesson start time.</param>
    public LessonStartTimes(int id, string time_string)
    {
        this.id = id;
        this.time_string = time_string;
    }
}