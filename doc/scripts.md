# Scripts

## General

The Tutoring Platform includes a collection of shell scripts designed to streamline the setup and deployment processes. These scripts are available for both Windows and Linux environments, ensuring compatibility and ease of use.

## How to Run the Scripts

To ensure the scripts will work properly, they **need** to be run in the base directory `Tutoring-Platform`

### Linux

On **Linux**, navigate to the root directory of the project and ensure the script is executable by modifying its permissions using the following command:
```bash
chmod +x ./scripts/linux/<script-name>.sh
```
Then, execute the script using:
```bash
./scripts/linux/<script-name>.sh
```

### Windows

Navigate to the `scripts\windows` directory and execute the script:

- Using **PowerShell**:
  ```powershell
  .\<script-name>.bat
  ```
- Using the **Command Prompt**:
  ```cmd
  <script-name>.bat
  ```

## Scripts

### Deploy

The `deploy` script is used to copy the website and backend files into separate deployment folders, creating a static deployed state of the project. This allows for a clear separation between the development and deployment environments. The script can be used for both the initial setup and for updating the deployment state.

### Create database

The `create_db` script is used to create the sqlite3 database and create all necessary tables.

### Create config

The `create_cfg` script is used to create the server side config file with premade example values.
Note that on windows, this script needs to first be saved with UTF-8 **without BOM** before each execution and **needs to be run in the command prompt** (not through the Visual Studio Code Command Prompt but the actual window and also can't be invoked to run in command prompt from a PowerShell)