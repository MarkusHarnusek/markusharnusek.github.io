namespace server
{
    internal class Program
    {
        /// <summary>
        /// Gets the public IPv6 address and falls back to returning the public IPv4 address
        /// </summary>
        /// <returns></returns>
        static async Task<string> GetPublicIpAsync()
        {
            using var httpClient = new HttpClient();
            httpClient.Timeout = TimeSpan.FromSeconds(3);

            // Try to obtain the IPv6 address
            try
            {
                return await httpClient.GetStringAsync("https://api64.ipify.org");
            }
            catch (Exception e)
            {
                Util.Log($"An error occured while obtaining public IPv4 address: {e.Message.ToString()}", LogLevel.Fatal);
                Environment.Exit(1);
            }

            return string.Empty;
        }

        static async Task Main(string[] args)
        {
            string publicIp = await GetPublicIpAsync();
            Util.Log($"Public IP Address: {publicIp}", LogLevel.Ok);
        }
    }
}