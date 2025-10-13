namespace server;

/// <summary>
/// Represents a student in the tutoring system.
/// </summary>
public class Student
{
    /// <summary>
    /// The unique identifier for the student.
    /// </summary>
    public int id { get; }
    /// <summary>
    /// The first name of the student.
    /// </summary>
    public string first_name { get; set; }
    /// <summary>
    /// The last name of the student.
    /// </summary>
    public string last_name { get; set; }
    /// <summary>
    /// The class or grade level of the student.
    /// </summary>
    public string student_class { get; set; }
    /// <summary>
    /// The email address of the student.
    /// </summary>
    public string email_address { get; set; }
    /// <summary>
    /// Initializes a new instance of the <see cref="Student"/> class with the specified details.
    /// </summary>
    /// <param name="id">The unique identifier for the student.</param>
    /// <param name="first_name">The first name of the student.</param>
    /// <param name="last_name">The last name of the student.</param>
    /// <param name="student_class">The class or grade level of the student.</param>
    /// <param name="email_address">The email address of the student.</param>

    public Student(int id, string first_name, string last_name, string student_class, string email_address)
    {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.student_class = student_class;
        this.email_address = email_address;
    }
}