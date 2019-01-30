import * as fs from 'fs';
import * as path from 'path';

interface IConfig {
  [key: string]: any;
}

let config: IConfig = {};

export const setConfig = (relativePath: string): void => {
  try {
    // Relative path must exist.
    // The path is from the project root.
    if (typeof relativePath === 'string' && relativePath !== '') {
      const absolutePath = path.resolve(relativePath);
      try {
        // Check access to the file.
        // If no access, crash with an error message.
        fs.accessSync(absolutePath, fs.constants.R_OK);
        // We only support JSON.
        if (path.extname(absolutePath) === '.json') {
          const file = fs.readFileSync(absolutePath);
          if (file) {
            config = {
              ...JSON.parse(file.toString()),
            };
          } else {
            console.log(`The config "${absolutePath}" Could not be read.`);
          }
        } else {
          console.log(`The config "${absolutePath}" is not JSON.`);
        }
      } catch {
        console.log(`No access to ${absolutePath}.`);
      }
    } else {
      console.log(
        'Invalid config path. It cannot be empty and it must be a string.'
      );
    }
  } catch {
    console.log('Failed to set the config.');
  }
};

export const getConfig = (relativePath: string): IConfig => {
  try {
    return config;
  } catch {
    console.log('Failed to return the config.');
    return {};
  }
};

export default getConfig;
