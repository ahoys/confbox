const config = require('../dist/index').default();

module.exports = {
  printConfig: () => {
    // Even the sub file knows the config!
    console.log('sub-file.js says:');
    console.log(config);
  }
}
