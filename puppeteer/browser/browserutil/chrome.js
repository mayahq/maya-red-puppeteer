const open = require('open');
const axios = require('axios');
const os = require("os").platform;
const homedir = os.homedir();
browser_extract_mac = "chrome-mac/Chromium.app"
browser_extract_linux = "chrome-linux/chrome"
browser_extract_win = "chrome-win\\chrome.exe" 
const browser = os === "darwin" ? homedir+"/.maya/bin/"+browser_extract_mac : os === "win32" ? homedir+"\\.maya\\bin\\"+browser_extract_win: homedir+"/.maya/bin/"+browser_extract_linux;

const chrome = async () => {
  await open("", { app: [browser, '--remote-debugging-port=9222', '--no-first-run', '--no-default-browser-check'] });
  return await new Promise(r => setTimeout(r, 1000))
};

const getWsUrl = async() => {
  try {
    var response = await axios.get('http://localhost:9222/json/version');
    return response;
  } catch (error) {
    new Promise(r => setTimeout(getWsUrl, 1000))
  }
};

module.exports = {
  chrome,
  getWsUrl
}