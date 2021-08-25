const puppeteer = require('puppeteer-extra')
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
let zip = require('./zips');
puppeteer.use(StealthPlugin())
const fs = require("fs");
const { truncate } = require('fs/promises');

// This is where we'll put the code to get around the tests.
const preparePageForTests = async (page) => {

  // Pass the User-Agent Test.
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

  await page.setUserAgent(userAgent);
  }
  


(async () => {
  try{
    set = new Set();
    b = new Map();
    const zips = zip.zips;
  
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.goto('https://www.vaccines.gov/search/')
    
    process.on('unhandledRejection', (reason, p) => {
      console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
      browser.close();
    });
  
      for (var i = 0; i < zips.length; i ++){
        console.log(zips[i]);

        
        await  page.waitForSelector('#zipCode',{setTimeout:1000})
         
        
        
        await page.screenshot({path: '2.png'});
        await page.focus('#zipCode')
        

        await page.keyboard.type(zips[i])
        
        await page.select('#searchArea', '50')
    
      
        await page.click('button[type="submit"]');
    
        await page.waitForSelector('.sc-gzcbmu');
    
    
      var out = await page.evaluate( () => {
        return Array.from(document.querySelectorAll(".sc-gzcbmu"), img => img.innerText)
      });
    
    
      out.forEach(a => {
        if (!set.has(a)){
          a = a.split('\n')[0].split(' ')
        z = a[a.length-1]
        if (b.has(z)){
          b.set(z, b.get(z) +1);
        } else{
          b.set(z,1);  
        }
        }
        set.add(a);
        
      });
    
     await page.goto('https://www.vaccines.gov/search/');
    }
  
     
  
  
    console.log(b);
    
    fs.writeFileSync('./msgdata.json', JSON.stringify([...b]) , 'utf-8'); 
  } catch(e){
    console.log(e);
  }
  finally{
    await browser.close;
  }
  









  // Add a wait for some selector on the home page to load to ensure the next step works correctly

  
})();