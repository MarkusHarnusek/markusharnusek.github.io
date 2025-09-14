using Microsoft.Data.Sqlite;
using System.Collections;
using System.Data.Common;

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
        /// A list containing all the above lists for easy iteration.
        /// </summary>
        public List<IList> tables;

        /// <summary>
        /// The SQLite connection to the database.
        /// </summary>
        private SqliteConnection? connection;

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

            tables = new List<IList>()
            {
                lesson_requests,
                contact_requests,
                lessons,
                students,
                subjects,
                statuses,
                start_times
            };

            // Check if the database exists
            DatabaseExistAction();
        }

        /// <summary>
        /// Loads the data from the database.
        /// </summary>
        /// <returns></returns>
        public async Task LoadData()
        {
            DatabaseExistAction();
            await ConnectToDatabase();
            ClearData();
        }

        /// <summary>
        /// Clears all data from the in-memory lists.  
        /// </summary>
        private void ClearData()
        {
            foreach (var table in tables)
            {
                table.Clear();
            }
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

        /// <summary>
        /// Connects to the SQLite database.
        /// </summary>
        /// <returns></returns>
        private async Task ConnectToDatabase()
        {
            if (connection == null)
            {
                connection = new SqliteConnection("Data Source=tutoring.db");
                await connection.OpenAsync();
                Util.Log("Connected to the database.", LogLevel.Ok);
            }

            if (connection.State != System.Data.ConnectionState.Open)
            {
                await connection.OpenAsync();
                Util.Log("Reconnected to the database.", LogLevel.Ok);
            }
        }

        /// <summary>
        /// Disconnects from the SQLite database.
        /// </summary>
        /// <returns></returns>
        private async Task DisconnectFromDatabase()
        {
            if (connection != null && connection.State == System.Data.ConnectionState.Open)
            {
                await connection.CloseAsync();
                Util.Log("Disconnected from the database.", LogLevel.Ok);
            }
        }

        #region  Data Retrieval Methods

        /// <summary>
        /// Loads all lessons from the database into the in-memory list.
        /// </summary>
        /// <returns></returns>
        private async Task LoadLessons()
        {
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "SELECT * FROM LESSON";

            using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    int id = reader.GetInt32(0);
                    int startTimeId = reader.GetInt32(1);
                    string dateStr = reader.GetString(2);
                    int subjectId = reader.GetInt32(3);
                    int studentId = reader.GetInt32(4);
                    int statusId;

                    // Try to parse status as int, fallback to -1 if not possible
                    if (!int.TryParse(reader.GetValue(5).ToString(), out statusId))
                    {
                        Util.Log($"Invalid status format for lesson ID {id}.", LogLevel.Error);
                        statusId = -1;
                    }

                    var startTime = start_times.Find(st => st.id == startTimeId) ?? new StartTime(-1, "unknown");
                    if (startTime.id == -1)
                    {
                        Util.Log($"Start time with ID {startTimeId} not found for lesson ID {id}.", LogLevel.Error);
                    }

                    if (!DateTime.TryParse(dateStr, out DateTime date))
                    {
                        Util.Log($"Invalid date format for lesson ID {id}. Expected format is YYYY-MM-DD.", LogLevel.Error);
                        date = DateTime.MinValue;
                    }

                    var subject = subjects.Find(s => s.id == subjectId) ?? new Subject(-1, "unknown", "unknown", "unknown", "unknown");
                    if (subject.id == -1)
                    {
                        Util.Log($"Subject with ID {subjectId} not found for lesson ID {id}.", LogLevel.Error);
                    }

                    var student = students.Find(s => s.id == studentId) ?? new Student(-1, "unknown", "unknown", "unknown", "unknown");
                    if (student.id == -1)
                    {
                        Util.Log($"Student with ID {studentId} not found for lesson ID {id}.", LogLevel.Error);
                    }

                    var status = statuses.Find(s => s.id == statusId) ?? new Status(-1, "unknown");
                    if (status.id == -1)
                    {
                        Util.Log($"Status with ID {statusId} not found for lesson ID {id}.", LogLevel.Error);
                    }

                    lessons.Add(new Lesson(id, startTime, date, subject, student, status));
                }
            }
        }

        /// <summary>
        /// Loads all start times from the database into the in-memory list.
        /// </summary>
        /// <returns></returns>
        private async Task LoadStartTimes()
        {
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "SELECT * FROM START_TIME";

            using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    int id = reader.GetInt32(0);
                    string time = reader.GetString(1);

                    start_times.Add(new StartTime(id, time));
                }
            }
        }

        /// <summary>
        /// Loads all statuses from the database into the in-memory list.
        /// </summary>
        /// <returns></returns>
        private async Task LoadStatuses()
        {
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "SELECT * FROM STATUS";

            using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    int id = reader.GetInt32(0);
                    string name = reader.GetString(1);

                    statuses.Add(new Status(id, name));
                }
            }
        }

        /// <summary>
        /// Loads all students from the database into the in-memory list.
        /// </summary>
        /// <returns></returns>
        private async Task LoadStudents()
        {
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "SELECT * FROM STUDENT";

            using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    int id = reader.GetInt32(0);
                    string first_name = reader.GetString(1);
                    string last_name = reader.GetString(2);
                    string student_class = reader.GetString(3);
                    string email_address = reader.GetString(4);

                    students.Add(new Student(id, first_name, last_name, student_class, email_address));
                }
            }
        }

        /// <summary>
        /// Loads all subjects from the database into the in-memory list.
        /// </summary>
        /// <returns></returns>
        private async Task LoadSubjects()
        {
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "SELECT * FROM SUBJECT";

            using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    int id = reader.GetInt32(0);
                    string name = reader.GetString(1);
                    string description = reader.GetString(2);
                    string level = reader.GetString(3);
                    string image = reader.GetString(4);

                    subjects.Add(new Subject(id, name, description, level, image));
                }
            }
        }
        
        #endregion
    }
}
