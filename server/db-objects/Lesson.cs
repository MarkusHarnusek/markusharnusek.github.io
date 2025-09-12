namespace server;

/// <summary>
/// Represents a lesson in the tutoring system.
/// </summary>
public class Lesson
{
    /// <summary>
    /// The unique identifier for the lesson.
    /// </summary>
    public int id { get; }
    /// <summary>
    /// The start time of the lesson.
    /// </summary>
    public StartTime start_time { get; }
    /// <summary>
    /// The date of the lesson.
    /// </summary>
    public DateTime date { get; }
    /// <summary>
    /// The subject of the lesson.
    /// </summary>
    public Subject subject { get; }
    /// <summary>
    /// The student associated with the lesson.
    /// </summary>
    public Student student { get; }
    /// <summary>
    /// The status of the lesson.
    /// </summary>
    public Status status { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Lesson"/> class with the specified details.
    /// </summary>
    /// <param name="id">The unique identifier for the lesson.</param>
    /// <param name="start_time">The start time of the lesson.</param>
    /// <param name="date">The date of the lesson.</param>
    /// <param name="subject">The subject of the lesson.</param>
    /// <param name="student">The student associated with the lesson.</param>
    /// <param name="status">The status of the lesson.</param>
    public Lesson(int id, StartTime start_time, DateTime date, Subject subject, Student student, Status status)
    {
        this.id = id;
        this.start_time = start_time;
        this.date = date;
        this.subject = subject;
        this.student = student;
        this.status = status;
    }
}