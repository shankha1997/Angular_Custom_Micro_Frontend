const path = require('path');
const fs = require('fs');
const util = require('util');

// get application version from package.json
const appVersion = require('../package.json').version;

// promisify core API's
const readDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

console.log('\nRunning post-build tasks');

// our version.json will be in the dist folder
const versionFilePath = path.join(__dirname + '/../dist/mfeapp2/version.json');

let mainHash = '';
let runTimeHash = '';
let mainBundleFile = '';
let runTimeBundleFile = '';

// RegExp to find main.bundle.js, even if it doesn't include a hash in it's name (dev build)
let mainBundleRegexp = /^main.?([a-z0-9]*)?(\.bundle)?.js$/;
let runTimeBundleRegexp = /^runtime.?([a-z0-9]*)?(\.bundle)?.js$/;

// read the dist folder files and find the one we're looking for
readDir(path.join(__dirname, '../dist/mfeapp2/'))
    .then(files => {
        mainBundleFile = files.find(f => mainBundleRegexp.test(f));
        runTimeBundleFile = files.find(f => runTimeBundleRegexp.test(f));

        if (mainBundleFile) {
            let matchHash = mainBundleFile.match(mainBundleRegexp);
            // if it has a hash in it's name, mark it down
            if (matchHash.length > 1 && !!matchHash[1]) {
                mainHash = matchHash[1];
            }
        }
        if (runTimeBundleFile) {
            let matchHash = runTimeBundleFile.match(runTimeBundleRegexp);
            // if it has a hash in it's name, mark it down
            if (matchHash.length > 1 && !!matchHash[1]) {
                runTimeHash = matchHash[1];
            }
        }

        console.log(`Writing version and hash to ${versionFilePath}`);

        // write current version and hash into the version.json file
        const src = `{"version": "${appVersion}", "mainHash": "${mainHash}", "runTimeHash": "${runTimeHash}"}`;
        return writeFile(versionFilePath, src);
    }).then(() => {
        // main bundle file not found, dev build?
        if (!mainBundleFile) {
            return;
        }

        console.log(`Replacing hash in the mainBundleFile ${mainBundleFile}`);
        console.log(`Replacing hash in the runTimeBundleFile ${runTimeBundleFile}`);

        // replace hash placeholder in our main.js file so the code knows it's current hash
        const mainFilepath = path.join(__dirname, '../dist/mfeapp2/', mainBundleFile);
        return readFile(mainFilepath, 'utf8')
            .then(mainFileData => {
                const replacedFile = mainFileData.replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash);
                return writeFile(mainFilepath, replacedFile);
            });
    }).catch(err => {
        console.log('Error with post build:', err);
    });