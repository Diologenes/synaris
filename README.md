<p align="center">
  <img src="https://img.shields.io/badge/Status-In-development-blue" alt="Status Alpha">
</p>

# synaris - get your shit (or snippets) together

## Description
Organize your code snippets, articles and thoughts in a desktop app (Windows & MacOS). Data is persisted locally in a SQLite database. Based on vuejs and electron. Uses Sequelize ORM.
Only in dark-mode available since all developers love it!

### Development
`npm i` (node v10)

##### SQLite3 / sequelize prerequisites on windows 
`npm install --global --production windows-build-tools`
`npm install --global node-gyp`
`setx PYTHON "%USERPROFILE%\.windows-build-tools\python27\python.exe"`
Remove node_modules and reinstall via `npm i`

What also helps with sqlite issues
`npm run electron:postinstall`

### Run the application
`npm run electron:serve`

### Build the application
`npm run electron:build`

### Based on
* Electron
* vueJs
* SQLite (Sequelize ORM)
* bootstrap-vue
