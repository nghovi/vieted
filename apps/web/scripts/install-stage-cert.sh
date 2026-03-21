#!/usr/bin/env bash
set -euo pipefail

DOMAIN_DIR="$HOME/.acme.sh/vieted.13.214.10.4.nip.io_ecc"

sudo cp "$DOMAIN_DIR/vieted.13.214.10.4.nip.io.key" /etc/ssl/private/vieted-stage.key
sudo cp "$DOMAIN_DIR/fullchain.cer" /etc/ssl/private/vieted-stage-fullchain.crt
sudo chmod 600 /etc/ssl/private/vieted-stage.key /etc/ssl/private/vieted-stage-fullchain.crt
sudo chown root:root /etc/ssl/private/vieted-stage.key /etc/ssl/private/vieted-stage-fullchain.crt
sudo systemctl reload httpd
