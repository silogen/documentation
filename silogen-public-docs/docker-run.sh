#!/bin/bash

# Source the .env file
set -a
source .env
set +a

docker run -d --name tinacms \
-e GITHUB_BRANCH="${GITHUB_BRANCH}" \
-e GITHUB_OWNER="${GITHUB_OWNER}" \
-e GITHUB_REPO="${GITHUB_REPO}" \
-e GITHUB_ACCESS_TOKEN="${GITHUB_ACCESS_TOKEN}" \
-e MONGODB_URI="${MONGODB_URI}" \
-e NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" \
-e NEXTAUTH_URL="${NEXTAUTH_URL}" \
--platform linux/amd64 \
europe-west4-docker.pkg.dev/silogen-dev/silogen-dev/tinacms-external-docs
