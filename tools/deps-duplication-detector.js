const { exec } = require('child_process');

const directDeps = require('../package.json').dependencies;

async function findDuplicates(deps) {
  await Promise.all(deps.map(dep => new Promise((resolve, reject) => {
    const p = exec(`npm ls ${dep} --json`);
    let npmOutput = '';
    p.stdout.on('data', (data) => npmOutput += data);

    p.on('exit', () => {
      const versionNumbers = Object.entries(JSON.parse(npmOutput).dependencies)
        .map(([name, value]) => name === dep ? value.version : value.dependencies[dep].version
      );

      if (new Set(versionNumbers).size > 1) {
        console.error(`Found duplicate dependency for ${dep}: [${versionNumbers.join(', ')}]\n${npmOutput}`);
        process.exit(1);
      }

      resolve();
    })
  })))
};

findDuplicates(Object.keys(directDeps))
