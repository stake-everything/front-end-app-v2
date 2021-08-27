const {Builder, By, Key} = require('selenium-webdriver');
const until = require('selenium-webdriver/lib/until');
var sleep = require('sleep');
require('chromedriver');

// let driver = new Builder().forBrowser('chrome').build();


class Page{
    constructor(){
        //global.driver= new Builder().forBrowser('chrome').build();
        this.driver = new Builder().forBrowser('chrome').build();
        this.until = until;
        this.title="Tapi Regions";
        //this.URL="http://127.0.0.1:5500/App.html";
    }
}

module.exports = Page;
