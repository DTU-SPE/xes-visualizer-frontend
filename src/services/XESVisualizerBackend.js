export default class XESVisualizerBackend {

    constructor() {
        this.urls = require('../assets/backend-hosts.json');
        this.url = '';
        this.getRandomURL();
    }

    getRandomURL() {
        var urls = this.getAllURLs();
        this.url = urls[Math.floor(Math.random() * urls.length)];
    }
    
    getAllURLs() {
        return this.urls;
    }

    getHostname() {
        return this.url["hostname"];
    }

    getProtocol() {
        return this.url["protocol"];
    }

    getUrl() {
        return this.getProtocol() + "://" + this.getHostname();
    }

    getUrlPing() {
        return this.getUrl() + "/ping";
    }

    getUrlUpload() {
        return this.getUrl() + "/upload";
    }

    getUrlSankey() {
        return this.getUrl() + "/createSankey";
    }

    getUrlChord() {
        return this.getUrl() + "/createChord";
    }
}