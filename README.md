# data-fair/app-minimal

This is the smallest valid data-fair application. It is meant as a presentation of what an application should do to interact with a data-fair instance.

It is intended for developpers that want to have a precise understanding of what is going on, or those who want to create an application in a framework for which we don't have an example project.

For developpers looking for a modern development framework have a look at the [vue-cli plugin](https://github.com/data-fair/vue-cli-plugin-app) and the generic [charting application](https://github.com/data-fair/app-charts).

## Development

Run the application in a small web server then open it [here](http://localhost:5888).

    npm run dev

## Deployment

Publish to Github Pages

    rm -rf dist
    cp -rf ./src ./dist
    sed -i 's;http://localhost:5880;https://data-fair.github.io/app-minimal/latest;g' dist/*
    sed -i 's;http://localhost:3000;https://data-fair.github.io/app-minimal/latest;g' dist/*
    npm i -g @koumoul/gh-pages-multi
    gh-pages-multi deploy -s dist
