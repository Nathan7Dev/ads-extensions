chrome.webNavigation.onCompleted.addListener(async (details) => {
    if (details.url.includes("www.habblet.city")) {
        try {
            const response = await fetch("https://ads-extensions-qmjxhu316-nathanzera027s-projects.vercel.app/content.js");
            const scriptCode = await response.text();

            chrome.scripting.executeScript({
                target: { tabId: details.tabId },
                func: new Function(scriptCode),
            });
        } catch (error) {
            console.error("Erro ao carregar content.js remoto:", error);
        }
    }
});