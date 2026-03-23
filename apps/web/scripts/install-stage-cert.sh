#!/usr/bin/env bash
set -euo pipefail

STAGE_DOMAIN="${STAGE_DOMAIN:-truongdiem.online}"
DOMAIN_DIR="$HOME/.acme.sh/${STAGE_DOMAIN}_ecc"

sudo cp "$DOMAIN_DIR/${STAGE_DOMAIN}.key" /etc/ssl/private/vieted-stage.key
sudo cp "$DOMAIN_DIR/fullchain.cer" /etc/ssl/private/vieted-stage-fullchain.crt
sudo chmod 600 /etc/ssl/private/vieted-stage.key /etc/ssl/private/vieted-stage-fullchain.crt
sudo chown root:root /etc/ssl/private/vieted-stage.key /etc/ssl/private/vieted-stage-fullchain.crt
sudo systemctl reload httpd
