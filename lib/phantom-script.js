var page = require('webpage').create(),
    sys = require('system');

if(sys.args.length !== 3) {
    console.log("Usage: phantomjs --ignore-ssl-errors=yes lib/phantom-script.js <username> <password>");
    phantom.exit();
}

var username = sys.args[1],
    password = sys.args[2];

page.open('https://wireless.net.uky.edu/fs/customwebauth/login.html', function(status) {
    if(status !== 'success') {
        console.log('loading failed');
        return phantom.exit();
    }
    page.onLoadStarted = function() {
        console.log('submission triggered...');
    }
    page.onLoadFinished = function() {
        if(page.url === 'https://wireless.net.uky.edu/fs/customwebauth/login.html') {
            console.log('login failed!');
            phantom.exit();
        } else {
            console.log('done');
            phantom.exit();
        }
    }
    page.evaluate(function(username, password) {
            username_input = document.querySelector("input[name=username]"),
            password_input = document.querySelector("input[name=password]"),
            submit_button = document.querySelector("input[name=Submit]");

        username_input.value = username;
        password_input.value = password;
        submit_button.click();
    }, username, password);
});
