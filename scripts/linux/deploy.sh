#!/bin/bash
# filepath: c:\Users\MarkusHTL\Documents\Projects\Web\Tutoring\scripts\linux\setup_deployment.sh

# Define source and target directories
WEBSITE_SOURCE="website"
DEPLOYMENT_TARGET="deployment"
BACKEND_SOURCE="server"
BACKEND_RUNTIME_TARGET="server-runtime"

# Create the deployment folder if it doesn't exist
if [ ! -d "$DEPLOYMENT_TARGET" ]; then
    mkdir "$DEPLOYMENT_TARGET"
else
    echo "Deployment folder already exists. Cleaning up old files."
    rm -rf "$DEPLOYMENT_TARGET"/*
fi

# Copy website contents to the deployment folder
if [ -d "$WEBSITE_SOURCE" ]; then
    cp -r "$WEBSITE_SOURCE/"* "$DEPLOYMENT_TARGET/"
else
    echo "Website source folder not found. Please ensure the '$WEBSITE_SOURCE' folder exists."
    exit 1
fi

# Create the backend-runtime folder if it doesn't exist
if [ ! -d "$BACKEND_RUNTIME_TARGET" ]; then
    mkdir "$BACKEND_RUNTIME_TARGET"
else
    echo "Backend-runtime folder already exists. Cleaning up old files."
    rm -rf "$BACKEND_RUNTIME_TARGET"/*
fi

# Copy backend contents to the backend-runtime folder
if [ -d "$BACKEND_SOURCE/bin/Debug/net9.0" ]; then
    find "$BACKEND_SOURCE/bin/Debug/net9.0" -type f \( -name "*.exe" -o -name "*.dll" -o -name "*.runtimeconfig.json" \) -exec cp {} "$BACKEND_RUNTIME_TARGET/" \;
else
    echo "Backend source folder not found. Please ensure the '$BACKEND_SOURCE/bin/Debug/net9.0' folder exists."
    exit 1
fi

echo "Deployment setup successful."