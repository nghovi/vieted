#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="centos@13.214.10.4"
SSH_KEY="${HOME}/ch_stock_stage.pem"

if [[ ! -f "$SSH_KEY" ]]; then
  echo "Missing SSH key: $SSH_KEY"
  exit 1
fi

echo "==> Running remote deploy"
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$REMOTE_HOST" <<'EOF'
set -euo pipefail
cd /home/centos/apps/vieted
bash ./apps/web/scripts/stage-deploy-remote.sh
EOF

echo "==> Stage deploy completed"
