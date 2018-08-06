# data-fair-minimal

This is the smallest valid data-fair application. It is meant as a presentation of what an application should do to interact with a data-fair instance.

It is intended for developpers that want to have a precise understanding of what is going on, or those who want to create an application in a framework for which we don't have an example project.

For developpers looking for a modern development framework, [data-fair-charts](https://github.com/koumoul-dev/data-fair-charts) is a better example.

## Run in a small web server

    npm i -g http-server
    http-server -p 5880 ./src

## Publish to Github Pages

    cp -rf ./src ./dist
    sed -i 's;http://localhost:5880;https://koumoul-dev.github.io/data-fair-minimal/latest;g' dist/*
    npm i -g @koumoul/gh-pages-multi
    gh-pages-multi deploy -s dist
