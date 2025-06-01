import {refreshAPIMode, API_URL, refreshCredentials, PASSWORD, USERNAME, CLOUDMODE,} from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
  
  const mainView = document.getElementById('mainView');
  const settingsView = document.getElementById('settingsView');
  const openSettingsBtn = document.getElementById('openSettingsBtn');
  const backBtn = document.getElementById('backBtn');
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  const usernameInput = document.getElementById('usernameInput');
  const usernamePass = document.getElementById('usernamePassword');
  const statusMsg = document.getElementById('statusMsg');
  const toggleSlider = document.getElementById('toggleSlider');
  const toggleLabel = document.getElementById('toggleLabel');

  
  async function fetchAPI(url_handle) {
    console.log(API_URL + url_handle)
    const response = await fetch(API_URL + url_handle);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log('API Response:', json);
    return json
  }

  // Show settings view
  openSettingsBtn.addEventListener('click', () => {
    mainView.style.display = 'none';
    settingsView.style.display = 'block';


    const isOn = CLOUDMODE ?? false;
    toggleSlider.checked = isOn;
    toggleLabel.textContent = isOn ? 'AWS' : 'Local';

    usernameInput.value = USERNAME ?? '';
    usernamePass.value = PASSWORD ?? '';

    // Handle toggle
    toggleSlider.addEventListener('change', () => {
      const isOn = toggleSlider.checked;
      chrome.storage.sync.set({ cloudMode: isOn }, () => {
        toggleLabel.textContent = isOn ? 'AWS' : 'Local';
        refreshAPIMode();
      });
    });
  });

  // Back to main view
  backBtn.addEventListener('click', () => {
    settingsView.style.display = 'none';
    mainView.style.display = 'block';
    statusMsg.textContent = '';
  });

  // Save settings
  saveSettingsBtn.addEventListener('click', async () => {
    const username = usernameInput.value;
    const password = usernamePass.value;
    let data = {username, password};

    const response = await fetch(API_URL + "/auth/", {
        method: 'POST', // HTTP method
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)})
    const result = await response.json();
    chrome.storage.sync.set({ username, password }, () => {
      statusMsg.textContent = `Settings Saved! (${result.message})`;
      setTimeout(() => (statusMsg.textContent = ''), 4000);
      refreshCredentials();
    });
  });
});

