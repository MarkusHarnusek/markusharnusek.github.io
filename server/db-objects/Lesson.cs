namespace server;

public class Lesson
{
    public int id { get; }
    public StartTime start_time { get; }
    public DateTime date { get; }
    public Subject subject { get; }
    public Student student { get; }
    public Status status { get; }
    public string ip { get; }

    public Lesson(int id, StartTime start_time, DateTime date, Subject subject, Student student, Status status, string ip)
    {
        this.id = id;
        this.start_time = start_time;
        this.date = date;
        this.subject = subject;
        this.student = student;
        this.status = status;
        this.ip = ip;
    }
}