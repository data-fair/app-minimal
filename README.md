# data-fair/app-minimal

This is the smallest valid data-fair application. It is meant as a presentation of what an application should do to interact with a data-fair instance.

It is intended for developpers that want to have a precise understanding of what is going on, or those who want to create an application in a framework for which we don't have an example project.

For developpers looking for a modern development framework have a look at the [vue-cli plugin](https://github.com/data-fair/vue-cli-plugin-app) and the generic [charting application](https://github.com/data-fair/app-minimal).

## Development

Run the application in a small web server then open it [here](http://localhost:5888).

    npm run dev

## Deployment

Available on [jsdelivr CDN](https://www.jsdelivr.com/package/npm/@data-fair/app-minimal).

To publish the project, upload it to the global npm registry (you need to be a member of the owner organization).

```bash
npm version PATCH|MINOR|MAJOR
npm publish
git push && git push --tags
```

If the release is a bug fix and you don't want to wait 24h (the cache delay of jsdelivr), you can purge the cache for the index.html file of the minor version in the CDN:

```bash
curl https://purge.jsdelivr.net/npm/@data-fair/app-minimal@VER/dist/index.html
```

Replace `VER` with the minor version number (e.g. `1.0`).  
  
To publish a version for testing purposes you can tag it as a pre-release and publish it with the tag "staging".

```bash
npm version prerelease --preid=staging
npm publish --tag staging
curl https://purge.jsdelivr.net/npm/@data-fair/app-minimal@staging/dist/index.html
git push && git push --tags
```

Configure into a data-fair instance using [this URL](https://cdn.jsdelivr.net/npm/@data-fair/app-minimal@VER/dist/)