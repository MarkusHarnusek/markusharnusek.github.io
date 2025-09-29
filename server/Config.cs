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
    public LessonStartTimes lessonStartTimes { get; }
    /// <summary>
    /// Array of subjects with their configurations.
    /// </summary>
    public Subject[] subjects { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Config"/> class with specified settings.
    /// </summary>
    /// <param name="smtp">SMTP settings for email notifications.</param>
    /// <param name="notification">Notification settings for the application.</param>
    /// <param name="lessonStartTimes">Lesson start times configuration.</param>
    /// <param name="subjects">Array of subjects with their configurations.</param>
    public Config(Smtp smtp, Notification notification, LessonStartTimes lessonStartTimes, Subject[] subjects)
    {
        this.smtp = smtp;
        this.notification = notification;
        this.lessonStartTimes = lessonStartTimes;
        this.subjects = subjects;
    }
}