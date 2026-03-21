#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ARCHIVE_PATH="/tmp/vieted-stage.tgz"
REMOTE_HOST="centos@13.214.10.4"
REMOTE_APP_DIR="/home/centos/apps/vieted"
REMOTE_ARCHIVE_PATH="/home/centos/apps/vieted-stage.tgz"
SSH_KEY="${HOME}/ch_stock_stage.pem"

if [[ ! -f "$SSH_KEY" ]]; then
  echo "Missing SSH key: $SSH_KEY"
  exit 1
fi

echo "==> Packaging VietEd"
tar \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='apps/web/.next' \
  --exclude='apps/mobile/.dart_tool' \
  --exclude='apps/mobile/build' \
  --exclude='apps/mobile/.packages' \
  --exclude='apps/mobile/.flutter-plugins*' \
  --exclude='apps/mobile/.pub-cache' \
  --exclude='apps/mobile/macos' \
  -czf "$ARCHIVE_PATH" \
  -C "$ROOT_DIR" .

echo "==> Uploading bundle"
scp -i "$SSH_KEY" -o StrictHostKeyChecking=no "$ARCHIVE_PATH" "${REMOTE_HOST}:${REMOTE_ARCHIVE_PATH}"

echo "==> Running remote deploy"
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$REMOTE_HOST" <<'EOF'
set -euo pipefail
cd /home/centos/apps/vieted
bash ./deploy_stage.sh /home/centos/apps/vieted-stage.tgz
EOF

echo "==> Stage deploy completed"
