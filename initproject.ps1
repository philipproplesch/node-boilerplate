function DownloadFile([string] $source, [string] $destination) {
  (New-Object System.Net.WebClient).DownloadFile($source, $destination)
}

echo "Creating necessary folders"
mkdir ./static
mkdir ./static/images
mkdir ./static/css
mkdir ./static/js
mkdir ./views
mkdir ./models
mkdir ./test

echo "Copying Markup and CSS BoilerPlate..."
cp ./templates/app/server.js ./server.js
cp ./templates/app/package.json ./package.json
cp ./templates/app/.gitignore ./.gitignore
cp ./templates/app/config.json ./config.json
cp ./templates/app/Makefile ./Makefile
cp ./templates/test/stub.js ./test/stub.js
DownloadFile 'https://raw.github.com/h5bp/html5-boilerplate/master/css/main.css' './static/css/style.css'
cp ./templates/views/500.jade ./views/500.jade
cp ./templates/views/404.jade ./views/404.jade
cp ./templates/views/index.jade ./views/index.jade
cp ./templates/views/layout.jade ./views/layout.jade
cp ./templates/js/script.js ./static/js/script.js
# TODO copy over the models

echo "Setting up the dependencies from NPM..."
npm install

echo "Removing the stuff you dont want..."
rm .git -Force -Recurse
rm templates -Force -Recurse
rm README.md -Force
rm initproject.sh -Force
rm initproject.ps1 -Force

echo "Initing the new git project..."
git init
git add .
git commit -m"Initial Commit"

