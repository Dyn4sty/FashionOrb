/**
 * Remove old files, copy front-end ones.
 */

import fs from 'fs-extra';
import Logger from 'jet-logger';


try {
    // Remove current build
    fs.removeSync('./dist/');
    // Copy front-end files
    fs.copySync('./client/build', './dist/client/build');
    // fs.copySync('./src/views', './dist/views');
} catch (err) {
    Logger.Err(err);
}
