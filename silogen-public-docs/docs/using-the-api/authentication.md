---
sidebar_position: 1
---

# Authentication

You need an authentication token to access the service. Request an authentication token with e.g. the following terminal commands.
First install “jq” unless you already have.

Here is an example on macos using brew

```console
brew install jq
```

Then get the access token. Your username can be an email address or a plain username.

```console
curl -X POST https://auth.services.silogen.ai/realms/silogen/protocol/openid-connect/token -d grant_type=password -d client_id=cc6e3d5f-0b70-462c-b40a-1d795c948d3d -d username="YOUR.EMAIL@ADDRESS.COM" -d password="YOUR_PASSWORD" -d scope=openid | jq -r .access_token
```

The token will be printed as terminal output. You can copy it and use it to access the API as described below.
We recommend exporting the access token into an environment variable in your shell and reading the password in separately for safer and easier usage:

For zsh on mac:

```console
echo -n "Password: " && read -s password && echo && export ACCESS_TOKEN=$(curl -X POST https://auth.services.silogen.ai/realms/silogen/protocol/openid-connect/token -d grant_type=password -d client_id=cc6e3d5f-0b70-462c-b40a-1d795c948d3d -d username="YOUR.EMAIL@ADDRESS.COM" -d password="$password" -d scope=openid | jq -r .access_token)
```

For bash:

```console
export ACCESS_TOKEN=$(curl -X POST https://auth.services.silogen.ai/realms/silogen/protocol/openid-connect/token -d grant_type=password -d client_id=cc6e3d5f-0b70-462c-b40a-1d795c948d3d -d username="YOUR.EMAIL@ADDRESS.COM" -d password=$(read -sp "Password: ";echo $REPLY) -d scope=openid | jq -r .access_token)
```

A new token will need to be requested when the old one expires.
Section [Python Example](llm-service/python-example.md) shows how to request an authentication token in Python.
