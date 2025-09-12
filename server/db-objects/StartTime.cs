namespace server;

public class StartTime
{
    public int id { get; }
    public string time { get; }

    public StartTime(int id, string time)
    {
        this.id = id;
        this.time = time;
    }
}