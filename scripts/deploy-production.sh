#!/usr/bin/env bash
# Deploy fused-productions to the GMKtec host.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="${REPO_DIR:-$(cd "$SCRIPT_DIR/.." && pwd)}"
DEPLOY_DIR="${DEPLOY_DIR:-/home/ernest/projects/active/fused-productions}"
COMPOSE_PROJECT="${COMPOSE_PROJECT:-fused-productions}"
HEALTH_ATTEMPTS="${HEALTH_ATTEMPTS:-30}"
HEALTH_SLEEP_SECS="${HEALTH_SLEEP_SECS:-3}"

cd "$REPO_DIR"
git fetch origin
git reset --hard "${GITHUB_SHA:-origin/main}"
SHA="$(git rev-parse HEAD)"
export FUSED_IMAGE="${FUSED_IMAGE:-ghcr.io/tiptophimp/fused-productions:${SHA}}"
echo "=== Deploying $FUSED_IMAGE ==="

# Login to GHCR
echo "$GITHUB_TOKEN" | docker login ghcr.io -u tiptophimp --password-stdin
docker pull "$FUSED_IMAGE"

# Publish deploy config out of the ephemeral runner workspace
mkdir -p "$DEPLOY_DIR"
install -m 0644 deploy/docker-compose.yml "$DEPLOY_DIR/docker-compose.yml"
install -m 0644 deploy/docker-compose.db.yml "$DEPLOY_DIR/docker-compose.db.yml"
install -m 0644 deploy/env.example "$DEPLOY_DIR/env.example"

# Pin the image tag without wiping operator secrets (Stripe, DB, JWT, SMTP).
ENV_FILE="$DEPLOY_DIR/.env"
REST="$(mktemp)"
umask 077
if [ -f "$ENV_FILE" ]; then
  grep -v '^FUSED_IMAGE=' "$ENV_FILE" >"$REST" || true
else
  : >"$REST"
fi
{
  printf 'FUSED_IMAGE=%s\n' "$FUSED_IMAGE"
  cat "$REST"
} >"${ENV_FILE}.new"
mv "${ENV_FILE}.new" "$ENV_FILE"
rm -f "$REST"
chmod 0600 "$ENV_FILE"

cd "$DEPLOY_DIR"
docker compose -p "$COMPOSE_PROJECT" up -d --remove-orphans

# Health check
for _ in $(seq 1 "$HEALTH_ATTEMPTS"); do
  if docker compose -p "$COMPOSE_PROJECT" ps --status running 2>/dev/null | grep -q fusedproductions; then
    docker compose -p "$COMPOSE_PROJECT" ps
    echo "=== Deploy complete: ${SHA:0:12} ==="
    exit 0
  fi
  sleep "$HEALTH_SLEEP_SECS"
done

echo "ERROR: fusedproductions-web did not reach running state within $((HEALTH_ATTEMPTS * HEALTH_SLEEP_SECS))s" >&2
docker compose -p "$COMPOSE_PROJECT" logs --tail 30
exit 1
