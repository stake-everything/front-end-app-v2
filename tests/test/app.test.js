//"type":"module",
const expect = require('chai').expect;
const Page = require('../pageobjects/page.js');
const App = require('../pageobjects/app.page.js');


let p = new Page();
let BANNER_HEADER="Stake Everything";
let BANNER_MESSAGE="Earn the best interest with your crypto on the Binance Smart Chain.";

describe("App", async ()=>{

    let driver = p.driver;

    it("Banner should exist", async ()=>{

        try{
            await driver.get("https://stakeeverything.biz/");

            //check banner
            
            let bannerHeader = await driver.findElement( App.bannerHeader ).getText();
            let bannerMessage= await driver.findElement( App.bannerMessage ).getText();
            
            expect(bannerHeader).to.equal(BANNER_HEADER);
            expect(bannerMessage).to.equal(BANNER_MESSAGE);

            }
            catch(err){console.log(err);}
    });

    it("Search returns common coin elements with charts.", async ()=>{

        try{
            //await driver.get("https://stakeeverything.biz/");

            let test_coin = "btc";

            //check banner
            await driver.wait(p.until.elementLocated( App.searchBar ) , 5000);
            let sb = await driver.findElement( App.searchBar )
            sb.sendKeys(test_coin);


            await driver.wait(p.until.elementLocated( App.dataElementList ) , 5000);
            let els = await driver.findElements( App.dataElementList );
            let first_el = await els[0];
            let second_el = await els[1];
            let first_el_text = await first_el.getText()

            expect(first_el_text.toLowerCase().split(" ")[0] ).to.equal(test_coin);

            await second_el.click();
            let chart = await driver.findElement( App.canvas );
            expect( chart ).to.be.a( 'object' );

            }
            catch(err){console.log(err);}
            finally{
                await driver.quit();
            }
    });

})