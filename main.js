const path = require('path');
const { app, BrowserWindow } = require('electron');

const isDev = process.env.NODE_DEV !== 'production';
const isMac = process.platform === 'darwin';

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Image resizer',
        width: 500,
        height: 600,
    });

    // Open devtools if in dev environment 
    if(isDev) {
        mainWindow.webContents.openDevTools();
        // one other dev thing to use is electronmon (npx electronmon .)
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('active', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if(!isMac) {
        app.quit();
    }
});