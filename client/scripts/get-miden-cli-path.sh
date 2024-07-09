#!/bin/bash

# Check if the folder path is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <folder_path>"
  exit 1
fi

# Get the absolute path of the folder
ABS_PATH=$(realpath "$1")

# Check if realpath was successful
if [ $? -ne 0 ]; then
  echo "Error: Unable to get the absolute path of the folder."
  exit 1
fi

# Create or overwrite the testing.txt file with the FOLDER=<absolute_path> content
echo "CLI_PATH_FOLDER=$ABS_PATH" > .env

# Output the contents of the file for verification
cat testing.txt

echo "File 'testing.txt' created with content 'FOLDER=$ABS_PATH'"
