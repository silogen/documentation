#!/bin/bash

# Source the .env file
set -a
source .env
set +a

docker -D build \
--build-arg GITHUB_BRANCH="${GITHUB_BRANCH}" \
--build-arg NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" \
--build-arg MONGODB_URI="${MONGODB_URI}" \
--platform linux/amd64 \
-t europe-west4-docker.pkg.dev/silogen-dev/silogen-dev/external-docs  .
