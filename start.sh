#!/usr/bin/env bash
# Build the Kharcha dossier and serve the production build on http://localhost:7777
set -euo pipefail

# Always run from the project root (the directory this script lives in).
cd "$(dirname "$0")"

PORT=7777

# Install dependencies on first run.
if [ ! -d node_modules ]; then
  echo "==> Installing dependencies (first run)..."
  npm install
fi

echo "==> Building the dossier..."
npm run build

# The site uses base "/reimbursement" (for GitHub Pages), so it is served under that path.
echo "==> Serving on http://localhost:${PORT}/reimbursement/  (Ctrl+C to stop)"
exec npm run preview -- --port "${PORT}"
