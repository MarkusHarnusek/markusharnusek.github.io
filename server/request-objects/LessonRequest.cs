namespace server;

public class LessonRequest
{
    public string first_name { get; }
    public string last_name { get; }
    public string email { get; }
    public string subject { get; }
    public DateTime date { get; }
    public StartTime start_time { get; }
    public string ip { get; }

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