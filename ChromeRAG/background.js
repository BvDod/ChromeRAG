import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';
import { API_URL, refreshAPIMode, USERNAME, PASSWORD, refreshCredentials } from './constants.js';


async function sendPage(url, text, title) {
    refreshAPIMode();
    refreshCredentials();
    let data = {
        url,
        text,
        title,
        user: USERNAME,
        password: PASSWORD,};
    console.log('Sending data to API:', data);
    console.log('Sending data to API:', API_URL + "/submit/");
    
    const response = await fetch(API_URL + "/submit", {
        method: 'POST', // HTTP method
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)})

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log('API Response:', json);
    return json
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'pageSubmit' && message.html) {
        const { document } = parseHTML(message.html);
        const url = message.url || document.location.href;
        const reader = new Readability(document);
        const article = reader.parse();
        console.log('Title:', article.title);
        console.log('Site Name:', article.siteName);
        console.log('textContent:', article.textContent);

        sendPage(url, article.textContent, article.title);
    // You can send to server or store in storage here
  }
});