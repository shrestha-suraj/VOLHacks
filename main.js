const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, Menu, ipcMain, BrowserWindow } = electron;

//create the twilio client
const client = require('twilio')('AC43ba3e9f287a9a06328476ba7026315e', 'e38437a58759eab40c754301faa11ca5')//Private ID and KEY
let mainWindow;

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
    mainWindow.setMenu(null);
});

ipcMain.on("item:number", function (e, number) {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "html", "index.html"),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.webContents.send("item:number", number);
    });
});
//Takes in number and sends sms from twilio
ipcMain.on("addNum", function (e, number){
    client.messages.create({
        to:'+1'+number,
        from:'+12056511702',
        body:'Suraj is an ass'
    })
    .then((message)=> console.log(message.sid));
});