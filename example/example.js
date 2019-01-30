// An example file you can use to test the library against.
// node example/example.js

// Save the config here. Then read it in the sub-file.
const { setConfig } = require('../build/index');
setConfig('./example/read-this.json');
const subFile = require('./sub-file');

subFile.printConfig();
