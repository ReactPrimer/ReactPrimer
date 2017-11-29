// //windows build requirement
// const setupEvents = require('./installers/setupEvents')
// if (setupEvents.handleSquirrelEvent()) {
//    // squirrel event handled and app will exit in 1000ms, so don't do anything else
//    return;
// }

// required electron modules
const electron = require('electron');
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const IPC = require('electron').ipcMain;
const { dialog } = require('electron');
const Menu = electron.Menu;
const openAboutWindow = require('about-window').default;

// required node modules
const path = require('path');
const url = require('url');
const fs = require('fs');

// file template generator function
const fileContent = require('./fileContent.js');
const flattenComponent = require('./flattenComponent.js');

// for development - Hot-Reloading
// require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


function createWindow() {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 720,
    height: 450,
    minWidth: 645,
    minHeight: 360,
    icon: path.join(__dirname, './assets/icons/png/128x128.png')
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // About React-Primer window in menu
  const menu = Menu.buildFromTemplate([
    {
      label: 'React Primer',
      submenu: [
        {
          label: 'About React Primer',
          click: () => openAboutWindow({
            icon_path: path.join(__dirname, './assets/icons/png/256x256.png'),
            copyright: 'Copyright © 2017 React Primer. All Rights Reserved.',
            homepage: 'http://react-primer.com/',
            bug_report_url: 'https://github.com/ReactPrimer/ReactPrimer/issues',
            description: "React Prototyping Tool"
          })
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        },
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()


  /*****

  Functions for Electron backend functionality:
    componentTree:
    - the IPC listens for component info to be received from the front end.
    - openDialog lets user to select where exported file folder will be generated.
    - openDialog outputs the file directory (fileDir) that was chosen by the user.
    - a directory gets created.
    - for each component filecontent is called and file is generated with its content.

    openFile:
    - allows user to import project file

    saveFile:
    - allows user to save project file

  *****/
  IPC.on('componentTree', (event, components) => {
    let flattenComps = flattenComponent(components);
    dialog.showOpenDialog({
      title: 'Please select where to export',
      properties: ['openDirectory'],
      buttonLabel: 'Save'
    },
      fileDir => {
        if (!fileDir) return;
        let projDir = fileDir + '/components';
        fs.mkdir(projDir, err => {
          if (err) {
            dialog.showErrorBox('Duplicate Folder Error', 'A component folder already exists in selected directory')
          }
          else {
            for (let k = 0; k < flattenComps.length; k++) {
              fs.writeFileSync(projDir + '/' + flattenComps[k].title + '.jsx', fileContent(flattenComps[k]));
            };

            dialog.showMessageBox({ message: 'Component folder has been exported.', buttons: ['OK'] })
            event.sender.send('fileSuccess', 412)
          }
        });
      })
  })
  IPC.on('openFile', (event) => {
    dialog.showOpenDialog({
      title: 'Please select your .rpf file',
      properties: ['openFile'],
      filters: [{ name: 'All Files', extensions: ['rpf'] }]
    },
      filename => {
        if (!filename) return;
        fs.readFile(filename[0], (err, data) => {
          event.sender.send('fileData', JSON.parse(data));
        });
      }
    )
  })
  IPC.on('saveFile', (event, state) => {
    dialog.showSaveDialog({
      filters: [{
        name: 'React Primer Project File',
        extensions: ['rpf']
      }]
    }, filename => {
      if (!filename) return;
      fs.writeFileSync(filename, JSON.stringify(state));
    })
  });

  /*****

  Requires in direct path for React Dev Tools:
    - File path will be unique to the dev tools location on the developer's machine.

  *****/
  // const configValues = require('./config');
  // BrowserWindow.addDevToolsExtension(configValues.absolutePath);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
// app.on('window-all-closed', function () {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
