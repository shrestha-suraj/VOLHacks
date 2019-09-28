const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, Menu, ipcMain,BrowserWindow } = electron;

let mainWindow;
let homeWindow;

app.on("ready", function () {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 600,
        resizable: false,
        webPreferences: { nodeIntegration: true }

    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "html", "home.html"),
        protocol: 'file:',
        slashes: true
    }));

    const menu = Menu.buildFromTemplate(menuBarItems);
    Menu.setApplicationMenu(menu);
});

ipcMain.on("item:number", function (e, number) {
    homeWindow = new BrowserWindow({
        width: 500,
        height: 600,
        resizable: false,
        webPreferences: { nodeIntegration: true }

    });
    homeWindow.loadURL(url.format({
        pathname: path.join(__dirname, "html", "index.html"),
        protocol: 'file:',
        slashes: true
    }));
    homeWindow.webContents.send("item:number",number);
    mainWindow.close();
    console.log(number);
});

const menuBarItems = [{
    label: "File"
}
];

if (process.env.NODE_ENV !== 'production') {
    menuBarItems.push({
        label: 'Devloper Mode',
        submenu: [
            {
                label: 'Toggle Devtools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    }
    );
}