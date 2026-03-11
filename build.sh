#!/usr/bin/env bash
# exit on error
set -o errexit

# Install root dependencies
npm install

# Build the frontend
echo "Building client..."
cd client
npm install
npm run build
cd ..

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install
cd ..

echo "Build complete!"
