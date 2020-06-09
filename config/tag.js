const util = require("util");

const exec = util.promisify(require("child_process").exec);
async function runShellCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch (err) {
    console.error(err);
  }
}

const version = require("../package.json").version;

async function tag() {
  await runShellCmd(`git add .`);
  await runShellCmd(`git commit`);
  await runShellCmd(`git tag v${version}`);
}
tag();
