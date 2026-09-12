#!/usr/bin/env bash
# Build and push the Docker image to GHCR.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="${REPO_DIR:-$(cd "$SCRIPT_DIR/.." && pwd)}"

cd "$REPO_DIR"

SHA="${GITHUB_SHA:-$(git rev-parse HEAD)}"
IMAGE="ghcr.io/tiptophimp/fused-productions:${SHA}"

echo "=== Building $IMAGE ==="

# Login to GHCR
echo "$GITHUB_TOKEN" | docker login ghcr.io -u tiptophimp --password-stdin

# Build and push
docker build -t "$IMAGE" .
docker push "$IMAGE"

echo "=== Pushed $IMAGE ==="
