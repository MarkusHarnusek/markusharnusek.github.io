using System.Net;

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
        public static async Task<string> GetIpAsync()
        {
            using var httpClient = new HttpClient();
            httpClient.Timeout = TimeSpan.FromSeconds(3);

            // Try to obtain the IPv6 address
            try
            {
                return await httpClient.GetStringAsync("https://api.ipify.org");
            }
            catch (Exception e)
            {
                Util.Log($"An error occured while obtaining IP address: {e.Message}", LogLevel.Fatal);
                Environment.Exit(1);
            }

            return string.Empty;
        }

        public static async Task<bool> IsBehindNat()
        {
            // Get local ip address
            string localIp = string.Empty;

            foreach (var ip in Dns.GetHostEntry(Dns.GetHostName()).AddressList)
            {
                if (ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                {
                    localIp = ip.ToString();
                    break;
                }
            }

            // Get public ip address
            string publicIp = await GetIpAsync();

            bool isPrivate = localIp.StartsWith("10.") || localIp.StartsWith("192.168.") || (localIp.StartsWith("172.") && int.Parse(localIp.Split('.')[1]) is >= 16 and <= 31);
            return isPrivate && localIp != publicIp;
        }
    }
}