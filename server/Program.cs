namespace server
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            Util.Log($"Server started at: {Environment.CurrentDirectory}", LogLevel.Ok);

            // Get the server's IP address
            string ip = await Network.GetIpAsync();
            Util.Log($"Server's IP Address: {ip}", LogLevel.Ok);

            // Check if server is behind Nat
            if (await Network.IsBehindNat())
            {
                Util.Log("The server is behind a NAT. This may cause issues with clients connecting.", LogLevel.Warning);
            }

            // Initialize configuration
            // Config config = new Config(new Smtp("smtp.example.com", "user@example.com", "password"), new Notification("admin@example.com", true, true, new MailResponse("User Subject", "Admin Message", "User Body", "Admin Subject"), new MailResponse("Lesson Request Subject", "Lesson Request Admin Message", "Lesson Request User Body", "Lesson Request Admin Subject"), new MailResponse("Lesson Acceptance Subject", "Lesson Acceptance Admin Message", "Lesson Acceptance User Body", "Lesson Acceptance Admin Subject")), new List<StartTime>() { new StartTime(1, "09:00"), new StartTime(2, "10:00"), new StartTime(3, "11:00") }, new List<Subject> { new Subject(1, "Mathematics", "MATH", "John Doe", "Math is just numbers and letters."), new Subject(2, "Physics", "PHY", "John Doe", "Physics is when you drop an apple.") });
            // Config config = new Config();
            Config config = Config.Load();

            // Initialize the database
            Database database = new Database();

            // Load data from the database
            await database.LoadData();

            // Initialize the HTTP server
            var network = new Network([ $"https://localhost:8443/" ], database);
            await network.StartAsync();
        }
    }
}