#!/bin/sh
set -eu

if [ "${RUN_MIGRATIONS:-1}" = "1" ] && [ -n "${DATABASE_URL:-}" ]; then
  echo "Running prisma migrate deploy"
  node node_modules/prisma/build/index.js migrate deploy
fi

exec node server.js
