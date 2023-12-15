#!/bin/bash

# Deploy using Vercel and capture the output
DEPLOY_OUTPUT=$(vercel --prod)

# Extract the URL from the output
PROD_URL=$(echo "$DEPLOY_OUTPUT" | grep -o "https://[^ ]*\.app")

# Navigate up one directory
cd ..

# Enter the 'client' directory
cd client
# Define the file path
FILE=".env"

# Check if the file exists
if [ -f "$FILE" ]; then
    # If it exists, remove it
    #rm "$FILE"
    echo "File $FILE found. Previous contents (to be overwritten):"
    cat $FILE
fi 

# Save the URL into a file
echo "NEXT_PUBLIC_PROD_URL=\"$PROD_URL\"" > .env
# Re-build the client
sudo npm run build

cd ..

# Call firebase deploy
sudo firebase deploy