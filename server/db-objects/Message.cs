namespace server;

/// <summary>
/// Represents a message in the tutoring system.
/// </summary>
public class Message
{
    /// <summary>
    /// The unique identifier for the message.
    /// </summary>
    public int id { get; }
    /// <summary>
    /// The student associated with the message.
    /// </summary>
    public Student student { get; }
    /// <summary>
    /// The lesson associated with the message, if any.
    /// </summary>
    public Lesson? lesson { get; }
    /// <summary>
    /// The title of the message.
    /// </summary>
    public string title { get; }
    /// <summary>
    /// The body content of the message.
    /// </summary>
    public string body { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Message"/> class with the specified details.
    /// </summary>
    /// <param name="id">The unique identifier for the message.</param>
    /// <param name="student">The student associated with the message.</param>
    /// <param name="lesson">The lesson associated with the message, if any.</param>
    /// <param name="title">The title of the message.</param>
    /// <param name="body">The body content of the message.</param>
    public Message(int id, Student student, Lesson? lesson, string title, string body)
    {
        this.id = id;
        this.student = student;
        this.lesson = lesson;
        this.title = title;
        this.body = body;
    }
}