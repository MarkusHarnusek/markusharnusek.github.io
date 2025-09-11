namespace server
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("--- Tutoring Server Started ---");
            Console.WriteLine(AppContext.BaseDirectory);
            string publicIp = await Network.GetPublicIpAsync();
            Util.Log($"Public IP Address: {publicIp}", LogLevel.Ok);
        }
    }
}