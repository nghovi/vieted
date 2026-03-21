#!/usr/bin/env bash
set -euo pipefail

ARCHIVE_PATH="${1:-/home/centos/apps/vieted-stage.tgz}"
APP_DIR="/home/centos/apps/vieted"
NODE_BIN="$HOME/local/node-v18.18.0-linux-x64-glibc-217/bin/node"
NPM_CLI="$HOME/local/node-v18.18.0-linux-x64-glibc-217/lib/node_modules/npm/bin/npm-cli.js"

mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [[ -f "$ARCHIVE_PATH" ]]; then
  find "$APP_DIR" -mindepth 1 -maxdepth 1 ! -name 'vieted.log' -exec rm -rf {} +
  tar -xzf "$ARCHIVE_PATH" -C "$APP_DIR"
fi

chmod +x "$APP_DIR/apps/web/scripts/stage-run.sh"

if [[ ! -f "$APP_DIR/apps/web/.env.production" ]]; then
  cat > "$APP_DIR/apps/web/.env.production" <<'EOF'
DB_HOST=cfd.c7hvdub23zsh.ap-southeast-1.rds.amazonaws.com
DB_PORT=3306
DB_DATABASE=vieted
DB_USERNAME=admin
DB_PASSWORD=
EOF
fi

export PATH="$HOME/local/node-v18.18.0-linux-x64-glibc-217/bin:$PATH"
export DB_HOST="${DB_HOST:-cfd.c7hvdub23zsh.ap-southeast-1.rds.amazonaws.com}"
export DB_PORT="${DB_PORT:-3306}"
export DB_DATABASE="${DB_DATABASE:-vieted}"
export DB_USERNAME="${DB_USERNAME:-admin}"
export DB_PASSWORD="${DB_PASSWORD:-}"

"$NODE_BIN" "$NPM_CLI" install
"$NODE_BIN" "$NPM_CLI" run db:setup --workspace web
"$NODE_BIN" "$NPM_CLI" run build:web

sudo cp "$APP_DIR/apps/web/scripts/vieted-stage.service" /etc/systemd/system/vieted-stage.service
sudo systemctl daemon-reload
sudo systemctl enable vieted-stage.service
sudo systemctl restart vieted-stage.service
sudo systemctl status vieted-stage.service --no-pager --lines=20
