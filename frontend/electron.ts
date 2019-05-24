import { app, BrowserWindow, Menu, Tray} from 'electron'

let window: BrowserWindow;
// otherwise the tray disappears after init app...
let tray = null;

// TODO: add option to quit
function initApp() {
    window = new BrowserWindow({ /*icon: "./assets/logo.jpg",*/ show: false, webPreferences: { nodeIntegration: true} })
    window.once('ready-to-show', () => {
        window.maximize();
        window.show()
    })
    window.loadFile("index.html");
}

app.on("ready", initApp);