using System.Net.NetworkInformation;

namespace server
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            string publicIp = await Network.GetPublicIpAsync();
            Util.Log($"Public IP Address: {publicIp}", LogLevel.Ok);
        }
    }
}