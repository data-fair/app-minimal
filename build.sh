#/bin/bash

rm -rf ./dist;
cp -rf ./src ./dist;
sed -i 's/http:\/\/localhost:3000/https:\/\/cdn.jsdelivr.net\/npm\/@data-fair\/app-minimal@1\/dist/g' dist/index.html;