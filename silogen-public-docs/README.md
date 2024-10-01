# Static site generator and visual editor for SiloGen external docs

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator. We also use Tina CMS
to enable visual editing of the docs without a Github account. Tina is deployed within a NextJS app.

This project contains the documentation under the /external-docs/docs directory in the form of mdx files. It also has files for the sidebar and a seed file for the first user. You can edit all of these locally and
commit the changes as usual or you can edit the pages using a visual cms tool called Tina through a webapp. You can also develop the Tina or
Docusaurus functionality of this project in itself.

## Quickstart With Tina

To see how Tina works with the files locally you can run Tina on your own machine. Tine will edit files locally and you can
commit as usual.
Install dependencies and then run the dev server for Tina. Access the server at localhost:3000/admin. Use pnpm
to install the dependencies. I prefer pnpm to npm since it's faster.

```
$ pnpm install && npm run dev
```

## Local Development of the Docusaurus site

Alternatively, you can edit the files manually in place and then see the results live at `http://localhost:3000/` with:

```
$ npx docusaurus start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server. When you are done editing you can commit changes as usual.

The sidebar is constructed from the `external-docs/config/sidebar/index.json` file. You can edit it manually or you can edit it using TinaCMS.

## Build

To build everything: the Docusaurus site, the Tina implementation, and the NextJS webapp do:

```
$ npm run build
```

### The actual Docusaurus site

This command generates the static content of the Docusaurus website with our docs into the `build` directory and can be served using any static contents hosting service (Github pages in our case). See the [deployment info](#deployment) below.

### The tina implementation and the NextJS app

The Tina CMS configuration is built and encapsulated in a NextJS application. In order to deploy it you need to also build
and deploy the docker container. While testing you can build and run the container like this:

```
$ ./docker-build.sh
$ ./docker-run.sh
```

For production use, the container is built using the usual CI/CD system.

### Using Tina CMS online

When TinaCMS is deployed as a web app you can use it to edit the files in the docs online without a Github account.

- First ask somebody to give you an account to the webapp.
- Edit the files as you wish. As you save your changes they are committed to the `external-docs` branch of the core repository.
- When your are done editing, create a PR for the changes (or ask someone to).
- When the PR is merged to main the deployment will happen automatically as described below.

## Deployment

### Deployment of the Docusaurus site

Deployment will happen automatically like this:

- when changes to this directory are detected on the main branch, the workflow "docs-public.yml" will copy it over to the public documentation repository.
- when there is a push to the main branch of that repo, its workflow "deploy-docs.yml" will build the site and deploy it in GitHub pages.

### Deployment of the Tina CMS/NextJS app for visual editing

The webapp is deployed during a release of the SiloGen system.

## Future Work

- enable regular auth with keycloak and a special role that allows editing docs.
- deploy also the internal docs using this method.
