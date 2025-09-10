@echo off

:: Define source and target directories
set WEBSITE_SOURCE=website
set DEPLOYMENT_TARGET=deployment
set BACKEND_SOURCE=backend
set BACKEND_RUNTIME_TARGET=backend-runtime

:: Create the deployment folder if it doesn't exist
if not exist "%DEPLOYMENT_TARGET%" (
    mkdir "%DEPLOYMENT_TARGET%"
) else (
    echo Deployment folder already exists. Cleaning up old files.
    del /q "%DEPLOYMENT_TARGET%\*"
    for /d %%D in ("%DEPLOYMENT_TARGET%\*") do rmdir /s /q "%%D"
)

:: Copy website contents to the deployment folder
if exist "%WEBSITE_SOURCE%" (
    xcopy "%WEBSITE_SOURCE%\*" "%DEPLOYMENT_TARGET%\" /E /H /C /Q
) else (
    echo Website source folder not found. Please ensure the "%WEBSITE_SOURCE%" folder exists.
    exit /b 1
)

:: Create the backend-runtime folder if it doesn't exist
if not exist "%BACKEND_RUNTIME_TARGET%" (
    mkdir "%BACKEND_RUNTIME_TARGET%"
) else (
    echo Backend-runtime folder already exists. Cleaning up old files.
    del /q "%BACKEND_RUNTIME_TARGET%\*"
    for /d %%D in ("%BACKEND_RUNTIME_TARGET%\*") do rmdir /s /q "%%D"
)

:: Copy backend contents to the backend-runtime folder
if exist "%BACKEND_SOURCE%" (
    xcopy "%BACKEND_SOURCE%\*" "%BACKEND_RUNTIME_TARGET%\" /E /H /C /Q
) else (
    echo Backend source folder not found. Please ensure the "%BACKEND_SOURCE%" folder exists.
    exit /b 1
)

echo Deployment setup successful.