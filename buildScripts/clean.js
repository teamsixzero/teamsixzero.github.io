/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs-extra');
const nodepath = require('path');

fs.emptyDirSync(nodepath.resolve(__dirname, '..', '_site'));
