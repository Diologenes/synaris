### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### SQLite3
npm install --global --production windows-build-tools
npm install --global node-gyp

In CLI: 
setx PYTHON "%USERPROFILE%\.windows-build-tools\python27\python.exe"

Remove node_modules and reinstall via npm i

## Install empty db
cd src/database
sequelize db:migrate