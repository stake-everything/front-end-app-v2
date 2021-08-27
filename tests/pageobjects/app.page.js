const {Builder, By, Key} = require('selenium-webdriver');
const until = require('selenium-webdriver/lib/until');
var sleep = require('sleep');
require('chromedriver');
const Page = require('./page.js');


class App extends Page {

    get bannerHeader(){
        return By.xpath('//*[@id="Home_logo-text__3DcFM"]') ;
    }

    get bannerMessage(){
        return By.xpath('//*[@id="Home_bsc-text__3Sa29"]') ;
    }

    get searchBar(){
        return By.xpath('//input') ;
    }

    get dataElementList(){
        return By.className('Home_Wrap__1AvC5') ;

    }

    get canvas(){
        return By.xpath('//canvas') ;
    }
}


module.exports = new App();