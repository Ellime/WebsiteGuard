class SiteData {
    /**
     * URL of the site.
     *
     * @type {string}
     */
    url;
    /**
     * Date the site was created.
     *
     * @type {Date}
     */
    createdDate;
    /**
     * How long the site has been active in days (rounded down).
     *
     * @type {Date}
     */
    daysSinceCreation;
    /**
     * How long the site has been registered for in days (rounded down).
     *
     * @type {integer}
     */
    registeredTime;

    /**
     * 
     * @param {string} url 
     * @param {string} createdDateQuery 
     * @param {string} expiresDateQuery 
     */
    constructor(href, whois) {
        const registryData = whois.querySelector("registryData");
        const createdDateData = registryData.querySelector("createdDate");
        const expiresDateData = registryData.querySelector("expiresDate");

        this.url = href;
        this.createdDate = createdDateData ? new Date(expiresDateData.textContent) : null;
        this.expiresDate = expiresDateData ? new Date(expiresDateData.textContent) : null;

        const presentDate = new Date();
        const converstionToDays = 1000 * 60 * 60 * 24;

        this.daysSinceCreation = this.createdDate ?  Math.floor((presentDate - this.createdDate) / converstionToDays): null;
        this.registeredTime = this.createdDate && this.expiresDate ? Math.floor((this.expiresDate - this.createdDate) / converstionToDays) : null;
    }

    // Getters

    getUrl() {
        return this.url;
    }
    getCreatedDate() {
        return this.createdDate;
    }
    getDaysSinceCreation() {
        return this.daysSinceCreation;
    }
    getRegisteredTime() {
        return this.registeredTime;
    }
    
}