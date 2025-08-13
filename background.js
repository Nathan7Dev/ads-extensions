chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.url.includes("www.habblet.city")) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['content.js']
    }).catch(console.error);
  }
});