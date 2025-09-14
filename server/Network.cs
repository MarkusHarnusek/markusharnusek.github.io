using System.Net;
using System.Text;
using System.Text.Json;

namespace server
{
    /// <summary>
    /// Handles network related tasks
    /// </summary>
    internal class Network
    {
        private readonly HttpListener _httpListener;
        private readonly Database _database;

        public Network(string[] prefixes, Database database)
        {
            if (!HttpListener.IsSupported)
            {
                Util.Log("HttpListener is not supported on this platform.", LogLevel.Fatal);
                Environment.Exit(1);
            }

            if (prefixes == null || prefixes.Length == 0)
            {
                throw new ArgumentException("prefixes");
            }

            _httpListener = new HttpListener();
            foreach (string prefix in prefixes)
            {
                _httpListener.Prefixes.Add(prefix);
            }

            _database = database;
        }

        public async Task StartAsync()
        {
            _httpListener.Start();
            Util.Log("HTTP server started.", LogLevel.Ok);

            while (true)
            {
                var context = await _httpListener.GetContextAsync();
                _ = Task.Run(() => HandleRequest(context));
            }
        }

        private async Task HandleRequest(HttpListenerContext context)
        {
            string path = context.Request.Url != null ? context.Request.Url.AbsolutePath.ToLower() : string.Empty;
            string method = context.Request.HttpMethod;

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 200;

            try
            {
                if (method == "GET")
                {
                    Util.Log($"Received GET request for {path} from {context.Request.RemoteEndPoint}", LogLevel.Ok);

                    if (path == "/api/statuses")
                    {
                        await JsonSerializer.SerializeAsync(context.Response.OutputStream, _database.statuses);
                        Util.Log($"Sent statuses data to {context.Request.RemoteEndPoint}", LogLevel.Ok);
                    }
                    else if (path == "/api/subjects")
                    {
                        await JsonSerializer.SerializeAsync(context.Response.OutputStream, _database.subjects);
                        Util.Log($"Sent subjects data to {context.Request.RemoteEndPoint}", LogLevel.Ok);
                    }
                    else if (path == "/api/start_times")
                    {
                        await JsonSerializer.SerializeAsync(context.Response.OutputStream, _database.start_times);
                        Util.Log($"Sent start times data to {context.Request.RemoteEndPoint}", LogLevel.Ok);
                    }
                    else if (path == "/api/lessons")
                    {
                        // Optional: filter by week if query param is present
                        var weekParam = context.Request.QueryString["WEEK"];
                        if (int.TryParse(weekParam, out int week))
                        {
                            var lessons = _database.lessons
                                .Where(l => System.Globalization.ISOWeek.GetWeekOfYear(l.date) == week)
                                .ToList();
                            await JsonSerializer.SerializeAsync(context.Response.OutputStream, lessons);
                        }
                        else
                        {
                            await JsonSerializer.SerializeAsync(context.Response.OutputStream, _database.lessons);
                        }
                        Util.Log($"Sent lessons data to {context.Request.RemoteEndPoint}", LogLevel.Ok);
                    }
                    else
                    {
                        context.Response.StatusCode = 404;
                        await context.Response.OutputStream.WriteAsync(Encoding.UTF8.GetBytes("{\"error\":\"Not found\"}"));
                        Util.Log($"Unknown endpoint {path} requested by {context.Request.RemoteEndPoint}", LogLevel.Warning);
                    }
                }
                else
                {
                    context.Response.StatusCode = 405;
                    await context.Response.OutputStream.WriteAsync(Encoding.UTF8.GetBytes("{\"error\":\"Method not allowed\"}"));
                }
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 500;
                await context.Response.OutputStream.WriteAsync(Encoding.UTF8.GetBytes("{\"error\":\"Internal server error\"}"));
                Util.Log($"Error handling request: {ex.Message}", LogLevel.Error);
            }
            finally
            {
                context.Response.OutputStream.Close();
            }
        }

        /// <summary>
        /// Gets the public IPv6 address and falls back to returning the public IPv4 address
        /// </summary>
        /// <returns>An IPv6 or IPv4 address</returns>
        public static async Task<string> GetIpAsync()
        {
            using var httpClient = new HttpClient();
            httpClient.Timeout = TimeSpan.FromSeconds(3);

            // Try to obtain the address
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