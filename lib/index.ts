import * as fs from 'fs';
import * as path from 'path';

interface IConfig {
  [key: string]: any;
}

// The config is stored here.
let config: IConfig = {};

/**
 * Sets a new config file.
 * @param relativePath - Relative path to the file from the app's root.
 */
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
  } catch (e) {
    console.log(e);
  }
};

/**
 * Returns the currently active config file.
 */
export const getConfig = (): IConfig => {
  try {
    return config;
  } catch (e) {
    console.log(e);
    return {};
  }
};

/**
 * Returns whether a config is set.
 * @returns {boolean} - True if the config is set and can be used.
 */
export const hasConfig = (): boolean => {
  try {
    return typeof config === 'object' && Object.keys(config).length > 0;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default getConfig;
