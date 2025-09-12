namespace server;

public class Subject
{
    public int id { get; }
    public string name { get; }
    public string shortcut { get; }
    public string teacher { get; }
    public string description { get; }

    public Subject(int id, string name, string shortcut, string teacher, string description)
    {
        this.id = id;
        this.name = name;
        this.shortcut = shortcut;
        this.teacher = teacher;
        this.description = description;
    }
}