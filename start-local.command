#!/bin/bash
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Install Node.js 20 or newer from https://nodejs.org and run this file again."
  exit 1
fi
if [ ! -d node_modules ]; then
  echo "Installing packages..."
  npm install || exit 1
fi
echo "Opening http://localhost:3000"
(open "http://localhost:3000" >/dev/null 2>&1 || true)
npm run dev
