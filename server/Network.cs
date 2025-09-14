using System.Net;
using System.Net.Mail;
using System.Text;
using System.Text.Json;

namespace server
{
    /// <summary>
    /// Handles network related tasks
    /// </summary>
    public class Network
    {
        /// <summary>
        /// The HTTP listener for incoming requests
        /// </summary>
        private readonly HttpListener _httpListener;
        /// <summary>
        /// The database instance for data access
        /// </summary>
        private readonly Database _database;

        /// <summary>
        /// Initializes a new instance of the Network class
        /// </summary>
        /// <param name="prefixes">The prefixes for the HTTP listener</param>
        /// <param name="database">The database instance for data access</param>
        /// <exception cref="ArgumentException"></exception>
        public Network(string[] prefixes, Database database)
        {
            // Check if HttpListener is supported
            if (!HttpListener.IsSupported)
            {
                Util.Log("HttpListener is not supported on this platform.", LogLevel.Fatal);
                Environment.Exit(1);
            }

            // Validate prefixes
            if (prefixes == null || prefixes.Length == 0)
            {
                throw new ArgumentException("prefixes");
            }

            // Create HttpListener and add prefixes
            _httpListener = new HttpListener();
            foreach (string prefix in prefixes)
            {
                _httpListener.Prefixes.Add(prefix);
            }

            // Assign database
            _database = database;
            Util.Log("HTTP server initialized.", LogLevel.Ok);
        }

        /// <summary>
        /// Starts the HTTP server and begins listening for incoming requests
        /// </summary>
        /// <returns></returns>
        public async Task StartAsync()
        {
            // Start the listener
            _httpListener.Start();
            Util.Log("HTTP server started.", LogLevel.Ok);

            // Listen for incoming requests
            while (true)
            {
                // Wait for a client request
                var context = await _httpListener.GetContextAsync();
                _ = Task.Run(() => HandleRequest(context));
            }
        }

        /// <summary>
        /// Handles an incoming HTTP request
        /// </summary>
        /// <param name="context">The HTTP listener context</param>
        /// <returns></returns>
        private async Task HandleRequest(HttpListenerContext context)
        {
            Util.Log($"Received {context.Request.HttpMethod} request for {context.Request.Url} from {context.Request.RemoteEndPoint}", LogLevel.Ok);
            string path = context.Request.Url != null ? context.Request.Url.AbsolutePath.ToLower() : string.Empty;
            string method = context.Request.HttpMethod;

            // Add CORS headers to every response
            context.Response.AddHeader("Access-Control-Allow-Origin", "*");
            context.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            context.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type");

            // Handle OPTIONS request for CORS preflight
            if (method == "OPTIONS")
            {
                Util.Log($"Handled CORS preflight request for {path} from {context.Request.RemoteEndPoint}", LogLevel.Ok);
                context.Response.StatusCode = 204;
                context.Response.OutputStream.Close();
                return;
            }

            // Set common response headers
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 200;

            try
            {
                // Handle GET requests
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
                // Handle POST requests
                else if (method == "POST")
                {
                    Util.Log($"Received POST request for {path} from {context.Request.RemoteEndPoint}", LogLevel.Ok);

                    if (path == "/contact")
                    {
                        using var reader = new StreamReader(context.Request.InputStream, context.Request.ContentEncoding);
                        string body = await reader.ReadToEndAsync();
                        var contactRequest = JsonSerializer.Deserialize<ContactRequest>(body);

                        if (contactRequest != null)
                        {
                            await _database.LoadData();
                            await _database.InsertRequest(new Request(-1, context.Request.RemoteEndPoint?.Address.ToString() ?? "unknown", DateTime.UtcNow));

                            if (_database.requests.Count(r => r.ip == context.Request.RemoteEndPoint?.Address.ToString() && (DateTime.UtcNow - r.timestamp).TotalMinutes < 1) > 5 ||
                                _database.requests.Count(r => r.ip == context.Request.RemoteEndPoint?.Address.ToString() && (DateTime.UtcNow - r.timestamp).TotalHours < 1) > 20)
                            {
                                context.Response.StatusCode = 429;
                                await context.Response.OutputStream.WriteAsync(Encoding.UTF8.GetBytes("{\"error\":\"Too many requests. Please wait before sending another message.\"}"));
                                Util.Log($"Rate limit exceeded for {context.Request.RemoteEndPoint}", LogLevel.Warning);
                                return;
                            }

                            if (!_database.students.Any(s => s.email_address == contactRequest.email))
                            {
                                await _database.InsertStudent(new Student(-1, contactRequest.first_name, contactRequest.last_name, contactRequest.student_class, contactRequest.email));
                            }

                            var student = _database.students.Find(s => s.email_address == contactRequest.email);
                            await _database.InsertMessage(new Message(-1, student!, null, contactRequest.title, contactRequest.body));
                            context.Response.StatusCode = 200;

                            string smtpDomain = await File.ReadAllTextAsync(Path.Combine(Environment.CurrentDirectory, "smtp_dom.txt"));
                            string smtpUser = await File.ReadAllTextAsync(Path.Combine(Environment.CurrentDirectory, "smtp_usr.txt"));
                            string smtpPassword = await File.ReadAllTextAsync(Path.Combine(Environment.CurrentDirectory, "smtp_pwd.txt"));
                            string adminEmailAddress = await File.ReadAllTextAsync(Path.Combine(Environment.CurrentDirectory, "admin_email.txt"));

                            var smtpClient = new SmtpClient(smtpDomain)
                            {
                                Port = 587,
                                Credentials = new NetworkCredential(smtpUser, smtpPassword),
                                EnableSsl = true,
                            };

                            var userEmail = new MailMessage
                            {
                                From = new MailAddress(smtpUser),
                                Subject = "Wir haben Deine Nachricht erhalten",
                                Body = $"Hey {contactRequest.first_name} {contactRequest.last_name},\n\nvielen Dank für Deine Nachricht. Wir werden uns so schnell wie möglich bei Dir melden.\n\nMit freundlichen Grüßen,\nDein Nachhilfe-Team ",
                            };
                            userEmail.To.Add(contactRequest.email);


                            var adminEmail = new MailMessage
                            {
                                From = new MailAddress(smtpUser),
                                Subject = "New contact request message",
                                Body = $"A new contact request has been received from {contactRequest.first_name} {contactRequest.last_name} ({contactRequest.email}).\n\nSubject: {contactRequest.title}\n\nMessage:\n{contactRequest.body}",
                            };
                            adminEmail.To.Add(adminEmailAddress);

                            try
                            {
                                await smtpClient.SendMailAsync(userEmail);
                                Util.Log("Confirmation email sent.", LogLevel.Ok);
                            }
                            catch (Exception ex)
                            {
                                Util.Log($"Error sending email: {ex}", LogLevel.Error);
                                context.Response.StatusCode = 500;
                                await context.Response.OutputStream.WriteAsync(Encoding.UTF8.GetBytes("{\"error\":\"Email sending failed: " + ex.Message + "\"}"));
                                return;
                            }

                            try
                            {
                                await smtpClient.SendMailAsync(adminEmail);
                                Util.Log("Admin notification email sent.", LogLevel.Ok);
                            }
                            catch (Exception ex)
                            {
                                Util.Log($"Error logging request: {ex}", LogLevel.Error);
                                return;
                            }


                            context.Response.StatusCode = 200;
                            await context.Response.OutputStream.WriteAsync(Encoding.UTF8.GetBytes("{\"status\":\"Message received\"}"));
                            Util.Log($"Contact request from {context.Request.RemoteEndPoint}", LogLevel.Ok);
                            return;

                        }
                        else
                        {
                            context.Response.StatusCode = 400;
                            await context.Response.OutputStream.WriteAsync(Encoding.UTF8.GetBytes("{\"error\":\"Invalid request body\"}"));
                            Util.Log($"Invalid contact request from {context.Request.RemoteEndPoint}", LogLevel.Warning);
                        }
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
                Util.Log($"Error handling request: {ex}", LogLevel.Error);
                return;
            }
            finally
            {
                try
                {
                    context.Response.OutputStream.Close();
                }
                catch (Exception ex)
                {
                    Util.Log($"Error closing response stream: {ex.Message}", LogLevel.Warning);
                }
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