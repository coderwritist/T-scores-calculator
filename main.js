const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const { contextIsolated } = require("process");
const url = require("url");
const ipc = electron.ipcMain
const dialog = electron.dialog
let win;

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  });

function createWindow()
{
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    
    });
    win.setMenuBarVisibility(false)
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'calc.html'),
        protocol: 'file:',
        slashes: true
      }));


win.on('closed', () =>
    {
        win = null;
    })

}


ipc.on("errdialog", function(event){
    dialog.showErrorBox("Invalid operation", "Empty fields are not accepted")
})

app.on('ready', createWindow);

app.on("window-all-closed", ()=>
{
    if(process.platform !== 'darwin')
    {
        app.quit()
    }
})


app.on('activate', ()=>
{
    if(win === null)
    {
        createWindow()
    }
})