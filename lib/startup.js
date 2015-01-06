#!/usr/bin/env node

var phantom = require('phantomjs'),
    childProcess = require('child_process'),
    path = require('path');

var re = /machine wireless.net.uky.edu login ([^\"]+?) port 80 password "([^\"]+)"/gm;

childProcess.exec('gpg -q --no-tty -d ~/.authinfo.gpg', function(error, stdout, stderr) {
    if(error) {
        console.log(error);
        process.exit(-1);
    }

    var match = re.exec(stdout),
        username = match[1],
        password = match[2];

    childProcess.execFile(phantom.path, [
        '--ignore-ssl-errors=yes',
        path.join(__dirname, 'phantom-script.js'),
        username,
        password
    ], function(error, stdout, stderr) {
        if(error) {
            console.log(error);
            process.exit(-1);
        }
        console.log(stdout);
    });
});
