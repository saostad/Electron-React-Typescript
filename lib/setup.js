#!/usr/bin/env node
const path = require("path");
const { runShellCmd } = require("./run-shell-command");
const { reactDevToolsDownloader } = require("./react-dev-tools-downloader");

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

    await reactDevToolsDownloader();

    if (runVsCode) {
      console.log(`starting vscode...`);
      runShellCmd(`code ${folderPath}`);
    }
  } catch (error) {
    console.log(error);
  }
}

setup();
