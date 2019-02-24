const server = require('pushstate-server');
const { test, approve } = require('react-styleguidist-visual');
const path = require('path');

const printSuccess = str => console.log('\x1b[32m' + str);
const printError = str => console.error('\033[31m' + str);

if (process.argv.indexOf('-u') !== -1) {
  approve({}).then(() => printSuccess('Updated'), err => printError(err));
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
      }).then(
        () => {
          printSuccess('Screenshots match');
          process.exit();
        },
        () => {
          printError('One or more new screenshots differ from their references! Run with `-- -u` to approve changes');
          process.exit(1);
        },
      );
    },
  );
}
