const server = require('pushstate-server');
const { test, approve } = require('react-styleguidist-visual');
const path = require('path');

const printSuccess = str => console.log('\x1b[32m' + str);
const printError = str => console.error('\033[31m' + str);
const screenshotsDir = path.join(__dirname, '..', 'styleguide-visual');

const approveScreenshots = () =>
  approve({
    dir: screenshotsDir,
  }).then(() => printSuccess('Done.'), err => printError(err));

if (process.argv.indexOf('-u') !== -1) {
  approveScreenshots();
} else {
  server.start(
    {
      directory: path.join(__dirname, '..', 'styleguide'),
      port: 6061,
    },
    (err, address) => {
      if (err) {
        printError(err);
        process.exit(1);
      }

      test({
        url: `http://${address.address}:${address.port}/#/Components`,
        wait: 150,
        dir: screenshotsDir,
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          executablePath: '/usr/bin/chromium-browser',
        },
      }).then(
        () => {
          printSuccess('Screenshots match.');
          approveScreenshots().then(() => process.exit());
        },
        err => {
          printError(err);
          printError('\nHint: Did you run `npm run build:demo` first?');
          printError(
            '\nOne or more new screenshots differ from their references! Run with `npm run test:visual-update` to approve changes',
          );
          process.exit(1);
        },
      );
    },
  );
}
