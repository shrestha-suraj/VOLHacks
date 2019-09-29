const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, Menu, ipcMain,BrowserWindow } = electron;

let mainWindow;

app.on("ready", function () {
    mainWindow = new BrowserWindow({
        width: 550,
        height: 700,
        resizable: false,
        webPreferences: { nodeIntegration: true }

    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "html", "home.html"),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.setMenu(null);
});

ipcMain.on("item:number", function (e, number) {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "html", "index.html"),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.on("did-finish-load",()=>{
        mainWindow.webContents.send("item:number",number);
    });
});