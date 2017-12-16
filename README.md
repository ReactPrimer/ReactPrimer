
# ReactPrimer &middot; <img src="https://travis-ci.org/kenhughlee/ReactPrimer.svg?branch=master">   [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ReactPrimer/ReactPrimer/blob/master/LICENSE.md) [![GitHub release](https://img.shields.io/github/release/qubyte/rubidium.svg)](https://github.com/ReactPrimer/ReactPrimer/releases/tag/1.0.0)

<p align="center"><img src="/assets/icons/png/128x128.png"></p>

<p align="center">React Primer is a component prototyping tool that generates fully connected class component code.</p>
<p align="center">
<img src="/assets/demo/demo_15mb.gif"/>
</p>

## Setup

###### MacOS

1. [Download](https://github.com/ReactPrimer/ReactPrimer/releases/download/1.0.0/ReactPrimer.dmg) the latest release .dmg file.
2. Open the installer.
3. Move React Primer to your local application folder.

###### Windows
1. [Download](https://github.com/ReactPrimer/ReactPrimer/releases/download/1.0.0/ReactPrimer-win32-x64.zip) the latest .zip file.  
2. Unpackage the .zip file.
3. Shortcut .exe file to desktop.
3. Follow installation process.

###### Linux
1. [Download](https://github.com/ReactPrimer/ReactPrimer/releases/download/1.0.0/React-Primer_1.0.0_amd64.deb) the latest .deb file.  
2. Unpackage the .deb file. 
3. Type in React-Primer from the terminal.

## Usage

* Name individual components, assign parent-child relationships, and add components to the project tree.

* Drag and drop individual components to restructure the hierarchy tree view.

* Export project to generate a folder of fully connected component classes.

* Save generated components locally to a new or existing project.

* Use Save/Load feature to revisit a prototype.

## Forking Your Own Version
**If you'd like to build your own version of React Primer:**

1. Clone the repo and `npm install` dependencies.

2. Open one terminal and `npm run dev` to generate the webpack build.

3. Open another terminal and `npm start` to start Electron.

4. Uncomment line 23 `require('electron-reload')(__dirname);` for hot reloading (Optional).

3. Enable Developer Tools (Optional).

&nbsp;&nbsp;&nbsp;&nbsp; *Chrome Developer Tool*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; a. Uncomment line 45 `mainWindow.webContents.openDevTools()`

&nbsp;&nbsp;&nbsp;&nbsp; *React Developer Tool*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; a. Uncomment line 78 `const configValues = require('./config');`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; b. Uncomment line 79 `BrowserWindow.addDevToolsExtension(configValues.absolutePath);`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; c. Create `./config` in root directory:

```
{
  "absolutePath": "/Users/*User*/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.5.2_0"
}
```

## Why

React Primer provides a visual representation of your project during the preliminary stages of development, before you write a single line of code.

This simple to use application saves time by generating component files that automatically require and render their child components based on the prototyped hierarchy.

React Primer’s component tree GUI makes it easy to test, edit, and re-export your component tree as many times as needed.


## Contributing


Please submit issues/pull requests if you have feedback or message the React Primer team to be added as a contributor: hello@react-primer.com


## Authors

Ken Lee (https://github.com/kenhughlee)

Kat Sampias (https://github.com/ksampias)

Vince Vuong (https://github.com/vincevuong)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
