namespace server
{
    /// <summary>
    /// Handles database interactions for the tutoring system.
    /// </summary>
    public class Database
    {
        /// <summary>
        /// A list of all lesson requests in the system.
        /// </summary>
        public List<LessonRequest> lesson_requests { get; }
        /// <summary>
        /// A list of all contact requests in the system.
        /// </summary>
        public List<ContactRequest> contact_requests { get; }
        /// <summary>
        /// A list of all lessons in the system.
        /// </summary>
        public List<Lesson> lessons { get; }
        /// <summary>
        /// A list of all students in the system.
        /// </summary>
        public List<Student> students { get; }
        /// <summary>
        /// A list of all subjects in the system.
        /// </summary>
        public List<Subject> subjects { get; }
        /// <summary>
        /// A list of all statuses in the system.
        /// </summary>
        public List<Status> statuses { get; }
        /// <summary>
        /// A list of all start times in the system.
        /// </summary>
        public List<StartTime> start_times { get; }

        /// <summary>
        /// Initializes a new instance of the <see cref="Database"/> class.
        /// </summary>
        public Database()
        {
            // Initialize empty lists for each entity type
            lesson_requests = new List<LessonRequest>();
            contact_requests = new List<ContactRequest>();
            lessons = new List<Lesson>();
            students = new List<Student>();
            subjects = new List<Subject>();
            statuses = new List<Status>();
            start_times = new List<StartTime>();

            // Check if the database exists
            DatabaseExistAction();
        }

        /// <summary>
        /// Refreshes the data from the database.
        /// </summary>
        /// <returns></returns>
        public async Task RefreshData()
        {

        }

        /// <summary>
        /// Handles the action to take when checking if the database exists.
        /// </summary>
        private void DatabaseExistAction()
        {
            if (CheckIfDatabaseExists())
            {
                Util.Log("Database found.", LogLevel.Ok);
            }
            else
            {
                Util.Log("Database not found. Please create tutoring.db in the server directory.", LogLevel.Fatal);
                Environment.Exit(1);
            }
        }

        /// <summary>
        /// Checks if the database file exists.
        /// </summary>
        /// <returns>True if the database exists; otherwise, false.</returns>
        private bool CheckIfDatabaseExists()
        {
            return File.Exists(Path.Combine(Environment.CurrentDirectory, "tutoring.db"));
        }
    }
}
