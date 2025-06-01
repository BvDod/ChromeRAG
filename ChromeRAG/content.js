const htmlContent = document.documentElement.outerHTML;
const currentUrl = window.location.href;

// Send the HTML content and URL to the background script
chrome.runtime.sendMessage({
  type: "pageSubmit",
  html: htmlContent,
  url: currentUrl
});