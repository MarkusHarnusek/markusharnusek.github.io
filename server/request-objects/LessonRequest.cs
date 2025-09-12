namespace server;

/// <summary>
/// Represents a lesson request made by a user.
/// </summary>
public class LessonRequest
{
    /// <summary>
    /// The first name of the user making the lesson request.
    /// </summary>
    public string first_name { get; }
    /// <summary>
    /// The last name of the user making the lesson request.
    /// </summary>
    public string last_name { get; }
    /// <summary>
    /// The email address of the user making the lesson request.
    /// </summary>
    public string email { get; }
    /// <summary>
    /// The subject of the lesson request.
    /// </summary>
    public string subject { get; }
    /// <summary>
    /// The date of the lesson request.
    /// </summary>
    public DateTime date { get; }
    /// <summary>
    /// The start time of the lesson request.
    /// </summary>
    public StartTime start_time { get; }
    /// <summary>
    /// The IP address of the user making the lesson request.
    /// </summary>
    public string ip { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="LessonRequest"/> class with the specified details.
    /// </summary>
    /// <param name="first_name">The first name of the user making the lesson request.</param>
    /// <param name="last_name">The last name of the user making the lesson request.</param>
    /// <param name="email">The email address of the user making the lesson request.</param>
    /// <param name="subject">The subject of the lesson request.</param>
    /// <param name="date">The date of the lesson request.</param>
    /// <param name="start_time">The start time of the lesson request.</param>
    /// <param name="ip">The IP address of the user making the lesson request.</param>
    public LessonRequest(string first_name, string last_name, string email, string subject, DateTime date, StartTime start_time, string ip)
    {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.subject = subject;
        this.date = date;
        this.start_time = start_time;
        this.ip = ip;
    }
}