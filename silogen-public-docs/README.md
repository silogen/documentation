# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm install
```

### Local Development

```
$ npx docusaurus start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service. See the [deployment info](#deployment) below.

### Deployment

Deployment will happen automatically like this:

- when changes to this directory are detected on the main branch, the workflow "docs-public.yml" will copy it over to the public documentation repository.
- when there is a push to the main branch of that repo, its workflow "deploy-docs.yml" will build the site and deploy it in GitHub pages.
