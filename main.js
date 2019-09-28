const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;
app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width:
        webPreferences:{nodeIntegration:true}});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,"html", 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on("closed", function () {
        app.quit();
    });
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});



function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item',
        webPreferences:{nodeIntegration:true}
    });
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,"html", "addWindow.html"),
        protocol: 'file',
        slashes: true
    }));

    addWindow.on("closed", function () {
        addWindow = null;
    });
}

ipcMain.on("item:add",function(e,item){
    mainWindow.webContents.send("item:add",item);
    addWindow.close();
});



const mainMenuTemplate = [{
    label: 'File',
    submenu: [
        {
            label: 'Add Item',
            click() {
                createAddWindow();
            }
        },
        {
            label: 'Clear Items',
            click(){
                mainWindow.webContents.send("item: clear");
            }
        },
        {
            label: 'Quit',
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click() {
                app.quit();
            }
        }]

}
];

if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Devloper Mode',
        submenu:[
            {
                label:'Toggle Devtools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:'reload'
            }
        ]
    }
    );
}