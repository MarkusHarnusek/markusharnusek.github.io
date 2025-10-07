namespace server;

/// <summary>
/// Represents a generic request data structure.
/// </summary>
public class RequestData
{
    /// <summary>
    /// The first name of the user making the request.
    /// </summary>
    public string first_name { get; }
    /// <summary>
    /// The last name of the user making the request.
    /// </summary>
    public string last_name { get; }
    /// <summary>
    /// The email address of the user making the request.
    /// </summary>
    public string email { get; }
    /// <summary>
    /// The subject of the request.
    /// </summary>
    public string subject { get; }
    /// <summary>
    /// The date of the request.
    /// </summary>
    public DateTime date { get; }
    /// <summary>
    /// The start time of the request.
    /// </summary>
    public StartTime start_time { get; }
    /// <summary>
    /// The class of the student making the request.
    /// </summary>
    public string student_class { get; }
    /// <summary>
    /// The IP address of the user making the request.
    /// </summary>
    public string body { get; }

    public RequestData(ContactRequest? contactRequest, LessonRequest? lessonRequest, Database db)
    {
        if (contactRequest != null)
        {
            first_name = contactRequest.first_name;
            last_name = contactRequest.last_name;
            email = contactRequest.email;
            subject = contactRequest.title;
            date = DateTime.MinValue;
            start_time = db.start_times.Find(t => t.id == 1)!;
            student_class = contactRequest.student_class;
            body = contactRequest.body;
        }
        else if (lessonRequest != null)
        {
            first_name = lessonRequest.first_name;
            last_name = lessonRequest.last_name;
            email = lessonRequest.email;
            subject = lessonRequest.subject;
            date = lessonRequest.date;
            start_time = lessonRequest.start_time;
            student_class = lessonRequest.student_class;
            body = "empty";
        }
        else
        {
            Util.Log("Both RequestData parameters are null", LogLevel.Warning);
            first_name = "unknown";
            last_name = "unknown";
            email = "unknown";
            subject = "unknown";
            date = DateTime.MinValue;
            start_time = db.start_times.Find(t => t.id == 1)!;
            student_class = "unknown";
            body = "empty";
        }
    }
}