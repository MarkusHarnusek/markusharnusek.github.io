namespace server;

public class Student
{
    public int id { get; }
    public string first_name { get; }
    public string last_name { get; }
    public string student_class { get; }
    public string email_address { get; }

    public Student(int id, string first_name, string last_name, string student_class, string email_address)
    {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.student_class = student_class;
        this.email_address = email_address;
    }
}