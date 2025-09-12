namespace server
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            Util.Log($"Server started at: {Environment.CurrentDirectory}", LogLevel.Ok);

            // Get the server's public IP address
            string publicIp = await Network.GetPublicIpAsync();
            Util.Log($"Server public IP Address: {publicIp}", LogLevel.Ok);

            // Initialize the database
            Database database = new Database();
        }
    }
}