#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/centos/apps/vieted"
NODE_BIN="$HOME/local/node-v18.18.0-linux-x64-glibc-217/bin/node"
NPM_CLI="$HOME/local/node-v18.18.0-linux-x64-glibc-217/lib/node_modules/npm/bin/npm-cli.js"
REPO_URL="git@github.com:nghovi/vieted.git"
BRANCH="main"
STASH_ON_DIRTY=1

for arg in "$@"; do
  case "$arg" in
    --no-stash)
      STASH_ON_DIRTY=0
      ;;
    *)
      echo "Unknown option: $arg"
      echo "Usage: $0 [--no-stash]"
      exit 1
      ;;
  esac
done

mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [[ ! -d "$APP_DIR/.git" ]]; then
  find "$APP_DIR" -mindepth 1 -maxdepth 1 ! -name 'vieted.log' -exec rm -rf {} +
  git init
  git remote add origin "$REPO_URL"
  git fetch origin "+refs/heads/$BRANCH:refs/remotes/origin/$BRANCH"
  git checkout -B "$BRANCH" "origin/$BRANCH"
else
  if [[ -n "$(git status --porcelain)" ]]; then
    if [[ "$STASH_ON_DIRTY" == "1" ]]; then
      STASH_NAME="vieted-stage-deploy-$(date +%F-%H%M%S)"
      git stash save -u "$STASH_NAME" >/dev/null
    else
      echo "Working tree has local changes. Re-run without --no-stash or clean manually."
      exit 1
    fi
  fi

  git fetch origin "+refs/heads/$BRANCH:refs/remotes/origin/$BRANCH"
  git checkout "$BRANCH"
  git reset --hard "origin/$BRANCH"
fi

chmod +x "$APP_DIR/apps/web/scripts/stage-run.sh"
chmod +x "$APP_DIR/apps/web/scripts/install-stage-cert.sh"

if [[ ! -f "$APP_DIR/apps/web/.env.production" ]]; then
  cat > "$APP_DIR/apps/web/.env.production" <<'EOF'
DB_HOST=cfd.c7hvdub23zsh.ap-southeast-1.rds.amazonaws.com
DB_PORT=3306
DB_DATABASE=vieted
DB_USERNAME=admin
DB_PASSWORD=
EOF
fi

if [[ -f "$APP_DIR/apps/web/.env.production" ]]; then
  set -a
  # Load persisted stage env values such as DB_PASSWORD before exporting defaults.
  source "$APP_DIR/apps/web/.env.production"
  set +a
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
