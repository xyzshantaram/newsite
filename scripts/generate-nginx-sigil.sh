#!/bin/bash
#
# generate-nginx-sigil.sh - Regenerate nginx.conf.sigil from dokku's own
# shipped template plus this repo's public_html-fallback patch.
#
# Usage:
#   ./scripts/generate-nginx-sigil.sh [ssh-alias]
#
#   ssh-alias  SSH alias for tomato (default: shantaram.xyz). The alias
#              must reach tomato directly and read
#              /var/lib/dokku/core-plugins/available/nginx-vhosts/templates/nginx.conf.sigil
#              without sudo (world-readable by default).
#
# Run this again whenever dokku upgrades on tomato, so the committed
# nginx.conf.sigil tracks any change to dokku's own template. If the patch
# no longer applies cleanly, dokku's template changed in a way that
# conflicts with it. Review nginx.conf.sigil.patch by hand, update it, and
# run this script again.

set -euo pipefail

ssh_alias="${1:-shantaram.xyz}"
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"
upstream_path="/var/lib/dokku/core-plugins/available/nginx-vhosts/templates/nginx.conf.sigil"

echo "Fetching dokku's nginx.conf.sigil from $ssh_alias..."
upstream_tmp="$(mktemp)"
trap 'rm -f "$upstream_tmp"' EXIT
ssh "$ssh_alias" "cat $upstream_path" > "$upstream_tmp"

echo "Applying $repo_root/nginx.conf.sigil.patch..."
patch -p1 -o "$repo_root/nginx.conf.sigil" "$upstream_tmp" "$repo_root/nginx.conf.sigil.patch"

echo "Wrote $repo_root/nginx.conf.sigil"
echo "Review the diff, then commit and push to redeploy."
