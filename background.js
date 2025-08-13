chrome.webNavigation.onCompleted.addListener(async (details) => {
    if (details.url.includes("www.habblet.city")) {
        try {
            const response = await fetch("https://ads-extensions-qmjxhu316-nathanzera027s-projects.vercel.app/api/contentAPI");
            const scriptCode = await response.text();

            // Cria uma função que injeta o script remoto como uma tag <script> na página
            const injectScript = new Function(`
        const script = document.createElement('script');
        script.textContent = ${JSON.stringify(scriptCode)};
        (document.head || document.documentElement).appendChild(script);
        script.remove();
      `);

            chrome.scripting.executeScript({
                target: { tabId: details.tabId },
                func: injectScript,
            });
        } catch (error) {
            console.error("Erro ao carregar content.js remoto:", error);
        }
    }
});