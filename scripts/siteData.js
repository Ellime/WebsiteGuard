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
    constructor(url, createdDateQuery, expiresDateQuery) {
        this.url = url;
        this.createdDate = createdDateQuery.textContent ? new Date(createdDateQuery.textContent): null;
        this.expiresDate = expiresDateQuery.textContent ? new Date(expiresDateQuery.textContent) : null;

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