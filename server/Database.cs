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
        /// A list of all messages in the system.
        /// </summary>
        public List<Message> messages { get; }
        /// <summary>
        /// A list of all requests in the system.
        /// </summary>
        public List<Request> requests { get; }

        /// <summary>
        /// A list containing all the above lists for easy iteration.
        /// </summary>
        public List<IList> tables;

        /// <summary>
        /// The SMTP domain for sending emails.
        /// </summary>
        public string smtp_dom { get; }
        /// <summary>
        /// The SMTP user for sending emails.
        /// </summary>
        public string smtp_usr { get; }
        /// <summary>
        /// The SMTP password for sending emails.
        /// </summary>
        public string smtp_pwd { get; }
        /// <summary>
        /// The admin email address for receiving notifications.
        /// </summary>
        public string admin_email { get; }

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
            lessons = new List<Lesson>();
            students = new List<Student>();
            subjects = new List<Subject>();
            statuses = new List<Status>();
            start_times = new List<StartTime>();
            messages = new List<Message>();
            requests = new List<Request>();

            smtp_dom = "";
            smtp_pwd = "";
            smtp_usr = "";
            admin_email = "";

            tables = new List<IList>()
            {
                lessons,
                students,
                subjects,
                statuses,
                start_times,
                messages,
                requests
            };

            // Check if the database exists
            DatabaseExistAction();
        }

        /// <summary>
        /// Loads the data from the database.
        /// </summary>
        /// <returns></returns>
        public async Task LoadData(Config config)
        {
            DatabaseExistAction();
            await ConnectToDatabase();
            ClearData();

            // Load data from the database
            await LoadStatuses();
            await LoadStudents();
            await LoadStartTimes();
            await LoadSubjects();
            await LoadLessons();
            await LoadMessages();

            // Load configuration data
            await ApplyStartTimesFromConfig(config);
            await ApplySubjectsFromConfig(config);

            Util.Log("Data loaded from the database.", LogLevel.Ok);
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
        public async Task ConnectToDatabase()
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
        public async Task DisconnectFromDatabase()
        {
            if (connection != null && connection.State == System.Data.ConnectionState.Open)
            {
                await connection.CloseAsync();
                Util.Log("Disconnected from the database.", LogLevel.Ok);
            }
        }

        #region  Data Insertion Methods

        /// <summary>
        /// Inserts a new student into the database.
        /// </summary>
        /// <param name="student">The student object to be inserted.</param>
        /// <returns></returns>
        public async Task InsertStudent(Student student)
        {
            // await ConnectToDatabase();
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "INSERT INTO STUDENT (first_name, last_name, student_class, email_address) VALUES ($first_name, $last_name, $student_class, $email_address)";
            cmd.Parameters.AddWithValue("$first_name", student.first_name);
            cmd.Parameters.AddWithValue("$last_name", student.last_name);
            cmd.Parameters.AddWithValue("$student_class", student.student_class);
            cmd.Parameters.AddWithValue("$email_address", student.email_address);

            await cmd.ExecuteNonQueryAsync();
        }

        /// <summary>
        /// Inserts a new lesson into the database.
        /// </summary>
        /// <param name="lesson">The lesson object to be inserted.</param>
        /// <returns></returns>
        public async Task InsertLesson(Lesson lesson)
        {
            // await ConnectToDatabase();
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "INSERT INTO LESSON (start_time_id, date, subject_id, student_id, status_id) VALUES ($start_time_id, $date, $subject_id, $student_id, $status_id)";
            cmd.Parameters.AddWithValue("$start_time_id", lesson.start_time.id);
            cmd.Parameters.AddWithValue("$date", lesson.date.ToString("yyyy-MM-dd"));
            cmd.Parameters.AddWithValue("$subject_id", lesson.subject.id);
            cmd.Parameters.AddWithValue("$student_id", lesson.student.id);
            cmd.Parameters.AddWithValue("$status_id", lesson.status.id);

            await cmd.ExecuteNonQueryAsync();
        }

        /// <summary>
        /// Inserts a new message into the database.
        /// </summary>
        /// <param name="message">The message object to be inserted.</param>
        /// <returns></returns>
        public async Task InsertMessage(Message message)
        {
            // await ConnectToDatabase();
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "INSERT INTO MESSAGE (student_id, lesson_id, title, body) VALUES ($student_id, $lesson_id, $title, $body)";
            cmd.Parameters.AddWithValue("$student_id", message.student.id);
            if (message.lesson != null)
            {
                cmd.Parameters.AddWithValue("$lesson_id", message.lesson.id);
            }
            else
            {
                cmd.Parameters.AddWithValue("$lesson_id", DBNull.Value);
            }
            cmd.Parameters.AddWithValue("$title", message.title);
            cmd.Parameters.AddWithValue("$body", message.body);

            await cmd.ExecuteNonQueryAsync();
        }

        /// <summary>
        /// Inserts a new request into the database.
        /// </summary>
        /// <param name="request">The request object to be inserted.</param>
        /// <returns></returns>
        public async Task InsertRequest(Request request)
        {
            // await ConnectToDatabase();
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "INSERT INTO REQUEST (ip, time) VALUES ($ip, $time)";
            cmd.Parameters.AddWithValue("$ip", request.ip);
            cmd.Parameters.AddWithValue("$time", request.timestamp.ToString("yyyy-MM-dd HH:mm:ss"));

            await cmd.ExecuteNonQueryAsync();
        }

        /// <summary>
        /// Inserts a new start time into the database.
        /// </summary>
        /// <param name="startTime">The start time object to be inserted.</param>
        /// <returns></returns>
        public async Task InsertStartTime(StartTime startTime)
        {
            Util.Log($"Inserting start time: {startTime.time}", LogLevel.Debug);
            // await ConnectToDatabase();
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "INSERT INTO START_TIME (time) VALUES ($time)";
            cmd.Parameters.AddWithValue("$time", startTime.time);

            await cmd.ExecuteNonQueryAsync();
        }

        /// <summary>
        /// Inserts a new subject into the database.
        /// </summary>
        /// <param name="subject">The subject object to be inserted.</param>
        /// <returns></returns>
        public async Task InsertSubject(Subject subject)
        {
            // await ConnectToDatabase();
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "INSERT INTO SUBJECT (name, short, teacher, description) VALUES ($name, $short, $teacher, $description)";
            cmd.Parameters.AddWithValue("$name", subject.name);
            cmd.Parameters.AddWithValue("$short", subject.shortcut);
            cmd.Parameters.AddWithValue("$teacher", subject.teacher);
            cmd.Parameters.AddWithValue("$description", subject.description);

            await cmd.ExecuteNonQueryAsync();
        }

        #endregion

        #region  Data Retrieval Methods

        /// <summary>
        /// Loads all start times from the configuration into the in-memory list and database.
        /// </summary>
        /// <param name="config">The configuration object containing start times.</param>
        private async Task ApplyStartTimesFromConfig(Config config)
        {
            List<StartTime> startTimesToRemove = new List<StartTime>();

            foreach (var configStartTime in config.startTimes)
            {
                var existingStartTime = start_times.FirstOrDefault(st => st.id == configStartTime.id);
                if (existingStartTime != null)
                {
                    // Check if the time has changed
                    if (existingStartTime.time != configStartTime.time)
                    {
                        // Replace the existing start time object
                        start_times.Remove(existingStartTime);
                        StartTime updatedStartTime = new StartTime(configStartTime.id, configStartTime.time);
                        start_times.Add(updatedStartTime);
                        await UpdateStartTime(updatedStartTime);
                        Util.Log($"Updated start time ID {configStartTime.id}: {configStartTime.time}", LogLevel.Debug);
                    }
                    else
                    {
                        Util.Log("Found existing start time", LogLevel.Debug);
                    }
                }
                else
                {
                    StartTime newStartTime = new StartTime(configStartTime.id, configStartTime.time);
                    start_times.Add(newStartTime);
                    await InsertStartTime(newStartTime);
                    Util.Log("Found new start time", LogLevel.Debug);
                }
            }

            // Find start times in database that are not in config
            foreach (var dbStartTime in start_times.ToList())
            {
                if (!config.startTimes.Any(st => st.id == dbStartTime.id))
                {
                    startTimesToRemove.Add(dbStartTime);
                }
            }

            if (startTimesToRemove.Count > 0)
            {
                Util.Log("Found remaining start times", LogLevel.Debug);

                foreach (var startTimeToRemove in startTimesToRemove)
                {
                    start_times.Remove(startTimeToRemove);
                    await RemoveStartTimeById(startTimeToRemove.id);
                }

                await ResetAutoIncrementForTable("START_TIME");
            }
        }

        /// <summary>
        /// Updates an existing start time in the database.
        /// </summary>
        /// <param name="startTime">The start time object to be updated.</param>
        /// <returns></returns>
        private async Task UpdateStartTime(StartTime startTime)
        {
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "UPDATE START_TIME SET time = $time WHERE id = $id";
            cmd.Parameters.AddWithValue("$time", startTime.time);
            cmd.Parameters.AddWithValue("$id", startTime.id);

            await cmd.ExecuteNonQueryAsync();
        }

        /// <summary>
        /// Helper method to remove a start time by its ID.
        /// </summary>
        /// <param name="id">The ID of the start time to remove.</param>
        /// <returns></returns>
        private async Task RemoveStartTimeById(int id)
        {
            // await ConnectToDatabase();
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "DELETE FROM START_TIME WHERE id = $id";
            cmd.Parameters.AddWithValue("$id", id);

            await cmd.ExecuteNonQueryAsync();
        }

        /// <summary>
        /// Apply all the subjects from the configurations into the in-memory list and database.
        /// </summary>
        /// <param name="config">The configuration object containing the subjects</param>
        /// <returns></returns>
        private async Task ApplySubjectsFromConfig(Config config)
        {
            List<Subject> subjectsToRemove = new List<Subject>();

            foreach (var configSubject in config.subjects)
            {
                var existingSubject = subjects.FirstOrDefault(s => s.id == configSubject.id);
                if (existingSubject != null)
                {
                    // Check if any properties have changed
                    if (existingSubject.name != configSubject.name ||
                        existingSubject.shortcut != configSubject.shortcut ||
                        existingSubject.teacher != configSubject.teacher ||
                        existingSubject.description != configSubject.description)
                    {
                        // Replace the existing subject object
                        subjects.Remove(existingSubject);
                        Subject updatedSubject = new Subject(configSubject.id, configSubject.name, configSubject.shortcut, configSubject.teacher, configSubject.description);
                        subjects.Add(updatedSubject);
                        await UpdateSubject(updatedSubject);
                        Util.Log($"Updated subject ID {configSubject.id}: {configSubject.name}", LogLevel.Debug);
                    }
                    else
                    {
                        Util.Log("Found existing subject", LogLevel.Debug);
                    }
                }
                else
                {
                    Subject newSubject = new Subject(configSubject.id, configSubject.name, configSubject.shortcut, configSubject.teacher, configSubject.description);
                    subjects.Add(newSubject);
                    await InsertSubject(newSubject);
                    Util.Log("Found new subject", LogLevel.Debug);
                }
            }

            // Find subjects in database that are not in config
            foreach (var dbSubject in subjects.ToList())
            {
                if (!config.subjects.Any(s => s.id == dbSubject.id))
                {
                    subjectsToRemove.Add(dbSubject);
                }
            }

            if (subjectsToRemove.Count > 0)
            {
                Util.Log("Found remaining subjects", LogLevel.Debug);

                foreach (var subjectToRemove in subjectsToRemove)
                {
                    subjects.Remove(subjectToRemove);
                    await RemoveSubjectById(subjectToRemove.id);
                }

                await ResetAutoIncrementForTable("SUBJECT");
            }
        }

        /// <summary>
        /// Updates an existing subject in the database.
        /// </summary>
        /// <param name="subject">The subject object to be updated.</param>
        /// <returns></returns>
        private async Task UpdateSubject(Subject subject)
        {
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "UPDATE SUBJECT SET name = $name, short = $short, teacher = $teacher, description = $description WHERE id = $id";
            cmd.Parameters.AddWithValue("$name", subject.name);
            cmd.Parameters.AddWithValue("$short", subject.shortcut);
            cmd.Parameters.AddWithValue("$teacher", subject.teacher);
            cmd.Parameters.AddWithValue("$description", subject.description);
            cmd.Parameters.AddWithValue("$id", subject.id);

            await cmd.ExecuteNonQueryAsync();
        }

        /// <summary>
        /// Helper method to remove a subject by its shortcut.
        /// </summary>
        /// <param name="id">The ID of the subject to remove.</param>
        /// <returns></returns>
        private async Task RemoveSubjectById(int id)
        {
            // await ConnectToDatabase();
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "DELETE FROM SUBJECT WHERE id = $id";
            cmd.Parameters.AddWithValue("$id", id);

            await cmd.ExecuteNonQueryAsync();
        }

        /// <summary>
        /// Resets the auto-increment counter for a specified table.
        /// </summary>
        /// <param name="tableName">The name of the table to reset.</param>
        /// <returns></returns>
        private async Task ResetAutoIncrementForTable(string tableName)
        {
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "DELETE FROM sqlite_sequence WHERE name = $tableName";
            cmd.Parameters.AddWithValue("$tableName", tableName);

            await cmd.ExecuteNonQueryAsync();

            Util.Log($"Reset auto-increment counter for table {tableName}", LogLevel.Debug);
        }

        /// <summary>
        /// Loads all lessons from the database into the in-memory list.
        /// </summary>
        /// <returns></returns>
        private async Task LoadLessons()
        {
            // await ConnectToDatabase();
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
            // await ConnectToDatabase();
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
            // await ConnectToDatabase();
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
            // await ConnectToDatabase();
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
            // await ConnectToDatabase();
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "SELECT * FROM SUBJECT";

            using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    int id = reader.GetInt32(0);
                    string name = reader.GetString(1);
                    string shortcut = reader.GetString(2);
                    string teacher = reader.GetString(3);
                    string description = reader.GetString(4);

                    subjects.Add(new Subject(id, name, description, teacher, shortcut));
                }
            }
        }

        /// <summary>
        /// Loads all messages from the database into the in-memory list.
        /// </summary>
        /// <returns></returns>
        private async Task LoadMessages()
        {
            // await ConnectToDatabase();
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "SELECT * FROM MESSAGE";

            using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    int id = reader.GetInt32(0);
                    int studentId = reader.GetInt32(1);
                    int? lessonId = reader.IsDBNull(2) ? null : reader.GetInt32(2);
                    string title = reader.GetString(3);
                    string body = reader.GetString(4);

                    var student = students.Find(s => s.id == studentId) ?? new Student(-1, "unknown", "unknown", "unknown", "unknown");
                    if (student.id == -1)
                    {
                        Util.Log($"Student with ID {studentId} not found for message ID {id}.", LogLevel.Error);
                    }

                    Lesson? lesson = null;
                    if (lessonId.HasValue)
                    {
                        lesson = lessons.Find(l => l.id == lessonId.Value);
                        if (lesson == null)
                        {
                            Util.Log($"Lesson with ID {lessonId.Value} not found for message ID {id}.", LogLevel.Error);
                        }
                    }

                    messages.Add(new Message(id, student, lesson, title, body));
                }
            }
        }

        /// <summary>
        /// Loads all requests from the database into the in-memory list.
        /// </summary>
        /// <returns></returns>
        private async Task LoadRequests()
        {
            // await ConnectToDatabase();
            var cmd = connection!.CreateCommand();
            cmd.CommandText = "SELECT * FROM REQUEST";

            using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    int id = reader.GetInt32(0);
                    string ip = reader.GetString(1);
                    string timestampStr = reader.GetString(2);

                    if (!DateTime.TryParse(timestampStr, out DateTime timestamp))
                    {
                        Util.Log($"Invalid timestamp format for request ID {id}. Expected format is YYYY-MM-DD HH:MM:SS.", LogLevel.Error);
                        timestamp = DateTime.MinValue;
                    }

                    requests.Add(new Request(id, ip, timestamp));
                }
            }
        }

        #endregion
    }
}
