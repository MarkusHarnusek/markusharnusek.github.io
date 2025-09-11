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
            string response = string.Empty;
            using var httpClient = new HttpClient();
            httpClient.Timeout = TimeSpan.FromSeconds(3);

            // Try to obtain the IPv6 address
            try
            {
                response = await httpClient.GetStringAsync("https://api64.ipify.org");
            }
            catch (Exception IPv6e)
            {
                Util.Log($"Unable to obtain public IPv6 address. Falling back to IPv4: {IPv6e.Message.ToString()}", LogLevel.Warning);

                // Fall back to IPv4 if unable to obtain IPv4
                try
                {
                    response = await httpClient.GetStringAsync("https://api.ipify.org");
                }
                catch (Exception IPv4e)
                {
                    Util.Log($"An error occured while obtaining public IPv4 address: {IPv4e.Message.ToString()}", LogLevel.Fatal);
                    Environment.Exit(1);
                }
            }

            return await httpClient.GetStringAsync("https://api.ipify.org");
        }

        static async Task Main(string[] args)
        {
            string publicIp = await GetPublicIpAsync();
            Util.Log($"Public IP Address: {publicIp}", LogLevel.Ok);
        }
    }
}