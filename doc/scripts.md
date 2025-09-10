# Scripts

## General

The Tutoring Platform includes a few shell scripts to help set up the deployment structure and save time. There are scripts for both `windows` and `linux`.

## How to run the scripts

### Linux

On __Linux__ navigate to the root directory of the project and ensure the script is executable by changing it's permissions using `chmod +x ./scripts/linux/<script-name>.sh`. Then run the script using `./scripts/linux/<script-name>.sh`.

### Windows

Navigate to `scripts\windows`:

 - Using __PowerShell__ execute the script by using `.\<script-name>.bat`.
 - Using the __Command Prompt__ execute the script by using `<script-name>.bat`.

## Scripts

### Setup deployment

The `setup_deployment` script is used to copy the website and backend files into seperate deployment folders to have a static deployed state of the project and be able to have a seperate branch used for development. It can be used not only for the inital setup but also for pushing a new deployment state.