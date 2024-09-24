/**
 * API key
 * 
 * @type {string}
 */
var apiKey = "YOUR_API_KEY_HERE";
/**
 * WIP
 *
 * @type {string}
 */
var popup = chrome.runtime.getURL("pages/redirected_page.html");
/**
 * Endpoint to send request to minus queries.
 *
 * @type {string}
 */
var WHOIS = "https://www.whoisxmlapi.com/whoisserver/WhoisService";

/**
 * Generate the endpoint to request WHOIS data from.
 *
 * @param {string} href: URL of the requested endpoint.
 * @returns {string}: WHOIS endpoint.
 */
function generateWHOISEndpoint(href) {
    let propertyApiKey = "apiKey=";
    let propertyDomainName = "domainName=";
    return WHOIS + "?" + propertyApiKey + apiKey + "&" + propertyDomainName + href;
}

/**
 * Send a request to WHOIS.
 * Because of the same origin policy we cannot pass in a 'Content-Type' as that triggers a CORS preflight.
 * WHOISXML API doesn't support CORS, either.
 * Our request needs to remain simple to allow us to send requests from every page we visit.
 *
 * @param {string} href
 */
function queryWHOIS(href) {
    let siteData;
    let endpoint = generateWHOISEndpoint(href);
    return new Promise((resolve, reject) => {
        fetch(endpoint)
        .then((response) => response.text())
        .then((str) => {
            const parser = new DOMParser();
            const whois = parser.parseFromString(str, "text/xml");
            siteData = new SiteData(href, whois.querySelector("createdDate"), whois.querySelector("expiresDate"));
            resolve(siteData);
        })
        .catch((error) => {
            console.error("Website Guard: Error when querying WHOIS.");
            console.error(error);
            reject();
        });
    });
}

/**
 * Returns whether a hostname is risky.
 *
 * @param {SiteData} site
 * @returns {boolean}: True if it is a risky site.
 */
function isRiskySite(site) {
    console.log("Days since creation:", site.getDaysSinceCreation());
    console.log("Registered time:", site.getRegisteredTime());
    if(site.getDaysSinceCreation() <= 90 || site.getRegisteredTime() <= 365) {
        console.log("Website Guard: Detected a risky site.");
        return true;
    }
    else {
        return false;
    }
}

/**
 * When a risky site is encountered, call this function to redirect to safety.
 */
function redirectToSafeSite(){
    console.log("Redirecting to safe site.");
    console.log(popup);
    window.location.replace(popup);
}

async function main() {
    let href = window.location.href;
    let siteData = await queryWHOIS(href);
    if(isRiskySite(siteData)) {
        redirectToSafeSite();
    }
}

main();