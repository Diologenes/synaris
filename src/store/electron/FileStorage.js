const electron = require('electron');
const path = require('path');
const fs = require('fs');

class FileStorage {
  constructor(parameter) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');

    // console.log('XXuserData', electron.remote.app.getPath('userData'));
    // console.log('XXappData', electron.remote.app.getPath('appData'));    
    // console.log('electron.remote.app.getAppPath()', electron.remote.app.getAppPath());
    // console.log('process.cwd()', path.join(process.cwd(), 'src/database/storage/database.sqlite'));
    // console.log('__dirname', __dirname);
    // console.log('process.cwd()', path.join(__dirname, '/src'));

    this.path = path.join(userDataPath, parameter.configName + '.json');
    this.data = parseDataFile(this.path, parameter.defaults);
  }
  
  get(key) {
    return this.data[key];
  }
  
  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    return defaults;
  }
}

// expose the class
module.exports = FileStorage;


// E.G.: 
// const store = new Store({
//   configName: 'user-preferences',
//   defaults: {
//     windowBounds: { width: 800, height: 600 }
//   }
// });
// store.set('windowBounds', { width, height });
