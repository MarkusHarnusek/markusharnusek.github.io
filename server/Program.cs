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

            // Initialize the database
            Database database = new Database();

            await database.LoadData();
            // await database.InsertLesson(new Lesson(-1, database.start_times[1], DateTime.Now.Date, database.subjects[2], database.students[0], database.statuses[0]));

            // Initialize the HTTP server
            var network = new Network([ $"https://localhost:8443/" ], database);
            await network.StartAsync();
        }
    }
}