#!/bin/bash

# Create dist directory if it doesn't exist
mkdir -p dist

# Copy required files from the main project
cp ../dist/js/standalone-renderer.js dist/
cp ../dist/js/vue-renderer.js dist/
cp ../dist/js/vue.runtime.global.js dist/

echo "Build completed successfully!"
