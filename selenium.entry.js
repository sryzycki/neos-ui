require('retractor');
const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');
const selene = require('selene');
const parseYaml = require('./Build/Utilities/ParseYaml');
const settings = parseYaml('Build/Selenium/Settings.yaml').Selenium;
const {baseUrl, url, credentials} = settings;
const dir = 'Tests/Behavior/';

const mocha = new Mocha();
const se = selene({
    base: baseUrl
});

const login = () => {
    se.goto(url);

    return Promise.all([
        se.find('#username').type(credentials.username),
        se.find('#password').type(credentials.password),
        se.click('button'),
        se.find('[data-reactroot]', undefined, 5000)
    ]);
};

/* @jsx retractor */
fs.readdirSync(dir)
    .filter(file => file.substr(-3) === '.js')
    .forEach(file => {
        mocha.addFile(
            path.join(dir, file)
        );
    });

login().then(() => {
    global.se = se;

    console.log('run');

    mocha.run(failures => {
        console.log(failures);
        process.on('exit', () => {
            se.quit().then(() => {
                process.exit(failures);
            });
        });
    });
});
