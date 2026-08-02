const puppeteer = require('puppeteer-core');
const axios = require('axios');

(async () => {
    try {
        const response = await axios.get('http://127.0.0.1:9222/json/version');
        const webSocketDebuggerUrl = response.data.webSocketDebuggerUrl;

        const browser = await puppeteer.connect({
            browserWSEndpoint: webSocketDebuggerUrl,
            defaultViewport: null
        });

        const pages = await browser.pages();
        let moolrePage = null;
        for (const page of pages) {
            const url = page.url();
            if (url.includes('moolre.com')) {
                moolrePage = page;
                break;
            }
        }

        if (moolrePage) {
            console.log("FOUND_MOOLRE_PAGE");
            // Extract the body text to find the products/menu
            const text = await moolrePage.evaluate(() => document.body.innerText);
            console.log(text.substring(0, 1500)); 
            browser.disconnect();
        } else {
            console.log("MOOLRE_PAGE_NOT_FOUND");
            console.log("Open URLs:");
            for (const page of pages) { console.log(page.url()); }
            browser.disconnect();
        }
    } catch (e) {
        console.error("CANNOT_CONNECT_CDP:", e.message);
    }
})();
