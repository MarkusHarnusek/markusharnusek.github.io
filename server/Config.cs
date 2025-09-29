using System.Text.Json;
using System.Text.Json.Serialization;

namespace server;

/// <summary>
/// Configuration settings for the server application.
/// </summary>
public class Config
{
    /// <summary>
    /// SMTP settings for email notifications.
    /// </summary>
    public Smtp smtp { get; }
    /// <summary>
    /// Notification settings for the application.
    /// </summary>
    public Notification notification { get; }
    /// <summary>
    /// Lesson start times configuration.
    /// </summary>
    public List<StartTime> startTimes { get; }
    /// <summary>
    /// Array of subjects with their configurations.
    /// </summary>
    public List<Subject> subjects { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Config"/> class with specified settings.
    /// </summary>
    /// <param name="smtp">SMTP settings for email notifications.</param>
    /// <param name="notification">Notification settings for the application.</param>
    /// <param name="startTimes">Lesson start times configuration.</param>
    /// <param name="subjects">Array of subjects with their configurations.</param>
    public Config(Smtp smtp, Notification notification, List<StartTime> startTimes, List<Subject> subjects)
    {
        this.smtp = smtp;
        this.notification = notification;
        this.startTimes = startTimes;
        this.subjects = subjects;
    }

    /// <summary>
    /// Loads the configuration settings from the config file.
    /// </summary>
    public static Config Load()
    {
        string path = Path.Combine(Environment.CurrentDirectory, "config.json");
        if (!File.Exists(path))
        {
            Util.Log($"The config file at {path} does not exist or is not accessible.", LogLevel.Fatal);
            Environment.Exit(1);
        }

        try
        {
            string json = File.ReadAllText(path);
            Util.Log("Config file loaded successfully.", LogLevel.Ok);
            return JsonSerializer.Deserialize<Config>(json)!;
        }
        catch (Exception ex)
        {
            Util.Log($"Failed to load config file: {ex.Message}", LogLevel.Fatal);
            Environment.Exit(1);
        }

        return null!;
    }
}