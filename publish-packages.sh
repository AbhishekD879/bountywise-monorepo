#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Check if VERDACCIO_URL is set
if [ -z "$VERDACCIO_URL" ]; then
  echo "ERROR: VERDACCIO_URL is not set."
  exit 1
fi

# Step 1: Set Verdaccio as the NPM registry
npm set registry $VERDACCIO_URL

# Step 2: Loop through all packages and log in before publishing
echo "Publishing packages..."
for package in ./packages/*; do
  if [ -f "$package/package.json" ]; then
    echo "Logging in to Verdaccio for package: $package"

    # Automate login for each package
    npm login --registry=$VERDACCIO_URL <<EOF
bountywise
bountywise
abhishekdiwate879@gmail.com
EOF

    echo "Publishing package: $package"
    (cd "$package" && npm publish --registry $VERDACCIO_URL)
  else
    echo "No package.json found in $package, skipping..."
  fi
done

# Step 3: Reset registry to default (optional)
echo "Resetting npm registry to default..."
npm set registry https://registry.npmjs.org
