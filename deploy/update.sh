#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
# Run git pull --ff-only first. Build/verify every site before modifying published files.
npm ci
node scripts/production.mjs build
release="$(date -u +%Y%m%dT%H%M%SZ)-$(git rev-parse --short HEAD)"
for pair in cbti:dist fast:build assist:build-sla; do
  key="${pair%%:*}"
  output="${pair#*:}"
  target="/var/www/3lp-releases/$release/$key"
  sudo install -d -m 755 "$target"
  sudo rsync -a --chmod=D755,F644 "$output/" "$target/"
done
# Existing directories from the original setup are preserved once, then replaced by symlinks.
for key in cbti fast assist; do
  current="/var/www/$key"
  if sudo test -d "$current" && ! sudo test -L "$current"; then
    sudo mv "$current" "/var/www/3lp-releases/$release/previous-$key"
  fi
  sudo ln -s "/var/www/3lp-releases/$release/$key" "/var/www/.$key-$release"
  sudo mv -Tf "/var/www/.$key-$release" "$current"
done
echo "Published release: $release. Existing releases retained for rollback."
