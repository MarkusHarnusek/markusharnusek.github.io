# Scripts

## General

The Tutoring Platform includes a collection of shell scripts designed to streamline the setup and deployment processes. These scripts are available for both Windows and Linux environments, ensuring compatibility and ease of use.

## How to Run the Scripts

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