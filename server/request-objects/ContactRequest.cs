namespace server;

public class ContactRequest
{
    public string first_name { get; }
    public string last_name { get; }
    public string email { get; }
    public string student_class { get; }
    public string title { get; }
    public string body { get; }
    public string ip { get; }

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