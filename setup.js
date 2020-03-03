#!/usr/bin/env node
const util = require("util");
const path = require("path");

/** Steps:
 * 1- create folder
 * 2- copy files to created folder
 * 3- run npm install
 * 4- run git init
 * 5- install react dev tools chrome extension
 * 5- run vscode
 */

const defaultFolderName = "electron-ts-starter";
const initWorkingDirectory = process.cwd();

let folderName = defaultFolderName;
if (process.argv.slice(2).length > 0) {
  folderName = process.argv.slice(2)[0];
}

const folderPath = path.join(initWorkingDirectory, folderName);

let runVsCode = false;
if (process.argv.slice(2).length > 1) {
  runVsCode = true;
}

const repo = "https://github.com/saostad/Electron-React-Typescript.git";
console.log(`downloading files from repo ${repo}`);

const exec = util.promisify(require("child_process").exec);
async function runShellCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch {
    err => {
      console.error(err);
    };
  }
}

async function setup() {
  try {
    await runShellCmd(`git clone --depth 1 ${repo} ${folderName}`);
    process.chdir(folderPath);

    console.log(`installing dependencies, please wait...`);
    await runShellCmd(`npm i`);
    console.log(`dependencies installed successfully!`);

    await runShellCmd(`npx rimraf ./.git`);
    console.log(`old .git folder deleted successfully!`);

    await runShellCmd(`git init && git add . && git commit -am "init commit"`);
    console.log(`new git repo initialized successfully!`);

    const unzipper = require("unzipper");
    const fetch = require("node-fetch");
    const reactDevToolsExtensionId = "fmkadmapgofadopljbjfkapdkoienihi";
    const res = await fetch(
      `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=72.0&x=id%3D${reactDevToolsExtensionId}%26installsource%3Dondemand%26uc`,
    );

    const buffer = await res.buffer();
    const dir = await unzipper.Open.buffer(buffer, { crx: true });
    await dir.extract({
      path: path.join(process.cwd(), "lib", "react-dev-tools"),
    });
    console.log(`react dev tools extension downloaded successfully!`);

    if (runVsCode) {
      console.log(`starting vscode...`);
      runShellCmd(`code ${folderPath}`);
    }
  } catch (error) {
    console.log(error);
  }
}

setup();
