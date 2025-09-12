namespace server;

/// <summary>
/// Represents a contact request made by a user.
/// </summary>
public class ContactRequest
{
    /// <summary>
    /// The first name of the user making the contact request.
    /// </summary>
    public string first_name { get; }
    /// <summary>
    /// The last name of the user making the contact request.
    /// </summary>
    public string last_name { get; }
    /// <summary>
    /// The email address of the user making the contact request.
    /// </summary>
    public string email { get; }
    /// <summary>
    /// The class or grade level of the student making the contact request.
    /// </summary>
    public string student_class { get; }
    /// <summary>
    /// The title or subject of the contact request.
    /// </summary>
    public string title { get; }
    /// <summary>
    /// The body or content of the contact request.
    /// </summary>
    public string body { get; }
    /// <summary>
    /// The IP address of the user making the contact request.
    /// </summary>
    public string ip { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="ContactRequest"/> class with the specified details.
    /// </summary>
    /// <param name="first_name">The first name of the user making the contact request.</param>
    /// <param name="last_name">The last name of the user making the contact request.</param>
    /// <param name="email">The email address of the user making the contact request.</param>
    /// <param name="student_class">The class or grade level of the student making the contact request.</param>
    /// <param name="title">The title or subject of the contact request.</param>
    /// <param name="body">The body or content of the contact request.</param>
    /// <param name="ip">The IP address of the user making the contact request.</param>
    public ContactRequest(string first_name, string last_name, string email, string student_class, string title, string body, string ip)
    {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.student_class = student_class;
        this.title = title;
        this.body = body;
        this.ip = ip;
    }
}