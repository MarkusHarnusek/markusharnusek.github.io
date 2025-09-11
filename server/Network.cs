       
namespace server
{
    /// <summary>
    /// Handles network related tasks
    /// </summary>
    internal class Network
    {
        /// <summary>
        /// Gets the public IPv6 address and falls back to returning the public IPv4 address
        /// </summary>
        /// <returns>An IPv6 or IPv4 address</returns>
        public static async Task<string> GetPublicIpAsync()
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
                Util.Log($"An error occured while obtaining public IPv4 address: {e.Message}", LogLevel.Fatal);
                Environment.Exit(1);
            }

            return string.Empty;
        }
    }
}