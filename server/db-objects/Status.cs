namespace server;

public class Status
{
    public int id { get; }
    public string name { get; }

    public Status(int id, string name)
    {
        this.id = id;
        this.name = name;
    }
}