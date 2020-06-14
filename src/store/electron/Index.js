import FileStorage from './FileStorage'

const electronFileStorage = new FileStorage({
  configName: 'user-preferences',
  defaults: {
    database: 'sqlite'
  }
});

export default electronFileStorage