// constants.js
export const API_URL_CLOUD = "https://api.example.com";
export const API_URL_LOCAL = "http://127.0.0.1:8000";

export let API_URL;
export let CLOUDMODE;
// Update API_URL and CLOUDMODE based on storage
export function refreshAPIMode() {
    chrome.storage.sync.get(['cloudMode'], (result) => {
        const cloudMode = result.cloudMode ?? false;
        CLOUDMODE = cloudMode;
        API_URL = cloudMode ? API_URL_CLOUD : API_URL_LOCAL;
        console.log('Updated API url:', API_URL);
    });
}
refreshAPIMode()

export let USERNAME;
export let PASSWORD;
// Update USERNAME and PASSWORD based on storage
export function refreshCredentials() {
    chrome.storage.sync.get(['username', 'password'], (result) => {
        USERNAME = result.username || '';
        PASSWORD = result.password || '';
        console.log('Updated credentials:', { USERNAME, PASSWORD });
    });
}
refreshCredentials()