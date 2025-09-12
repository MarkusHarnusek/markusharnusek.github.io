namespace server;

/// <summary>
/// Represents a subject in the tutoring system.
/// </summary>
public class Subject
{
    /// <summary>
    /// The unique identifier for the subject.
    /// </summary>
    public int id { get; }
    /// <summary>
    /// The name of the subject.
    /// </summary>
    public string name { get; }
    /// <summary>
    /// The shortcut or abbreviation for the subject.
    /// </summary>
    public string shortcut { get; }
    /// <summary>
    /// The teacher associated with the subject.
    /// </summary>
    public string teacher { get; }
    /// <summary>
    /// The description of the subject.
    /// </summary>
    public string description { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Subject"/> class with the specified details.
    /// </summary>
    /// <param name="id">The unique identifier for the subject.</param>
    /// <param name="name">The name of the subject.</param>
    /// <param name="shortcut">The shortcut or abbreviation for the subject.</param>
    /// <param name="teacher">The teacher associated with the subject.</param>
    /// <param name="description">The description of the subject.</param>
    public Subject(int id, string name, string shortcut, string teacher, string description)
    {
        this.id = id;
        this.name = name;
        this.shortcut = shortcut;
        this.teacher = teacher;
        this.description = description;
    }
}