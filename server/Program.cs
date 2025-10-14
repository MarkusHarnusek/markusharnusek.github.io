﻿namespace server
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

            Config config = Config.Load();

            // Initialize the database
            Database database = new Database();

            // Load data from the database
            await database.LoadData(config);

            // Initialize the HTTP server
            var network = new Network([ $"http://localhost:8443/" ], database);
            await network.StartAsync(config);
        }
    }
}