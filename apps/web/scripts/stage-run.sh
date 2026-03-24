#!/usr/bin/env bash
set -euo pipefail

export PATH="$HOME/local/node-v18.18.0-linux-x64-glibc-217/bin:$PATH"
export NODE_ENV=production
export PORT="${PORT:-3010}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export DB_HOST="${DB_HOST:-cfd.c7hvdub23zsh.ap-southeast-1.rds.amazonaws.com}"
export DB_PORT="${DB_PORT:-3306}"
export DB_DATABASE="${DB_DATABASE:-vieted}"
export DB_USERNAME="${DB_USERNAME:-admin}"
export DB_PASSWORD="${DB_PASSWORD:-}"

if [[ -z "$DB_PASSWORD" ]]; then
  echo "DB_PASSWORD is missing in /home/centos/apps/vieted/apps/web/.env.production"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
cd "$ROOT_DIR"

exec node \
  "$HOME/local/node-v18.18.0-linux-x64-glibc-217/lib/node_modules/npm/bin/npm-cli.js" \
  run start --workspace web
