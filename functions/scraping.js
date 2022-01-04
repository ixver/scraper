

const puppeteer = require('puppeteer');

export const set_driveMilestone = async (page, picLabel) => {

    await page.waitForTimeout(1100)
    if (picLabel){
        await page.screenshot({path: `${picLabel}.png`});
    }
    return

}

export const set_driveInput = async (page, selector, input) => {
    await page.waitForTimeout(1100)
    await page.type(selector, input);
}

export const set_driveClick = async (page, selector) => {
    await page.waitForTimeout(1100)
    await page.evaluate((selector) => document.querySelector(selector).click(), selector); 
}

export const get_listingsCites = async (page, citesList) => {
  
    await page.$$eval("a cite", elements => {
      return elements.map(element=>element.textContent)
    })
  
    .then((elements)=>{
      for (const val of elements){ 
        citesList.push(val);
      }
    })
  
    .then ((elements) => {
      // console.log(citesList);
      return citesList
    })
  
}
  

export const get_listingsURLs = async (page) => {
    let urlsList = []
    await page.$$eval("a", elements => {
      return elements.map(element=>element.href)
    })
  
    .then((elements)=>{
      for (const val of elements){ 
        // console.log(val);
        urlsList.push(val);
      }
      return urlsList
    })
  
    .then ((elements) => {
  
      urlsList = ['http://www.nyt.com']
      return urlsList
    })
    return urlsList
}

export const get_outputText = async (page, urlsList) => {

let outputTextList = []
for await (const url of urlsList){

    await page.goto(url)
    await page.waitForTimeout(1100)

    const listingText = await page.$$eval("p", elements => {
    return elements.map(e => e.textContent).filter(e=>e.length>0)
    })

    outputTextList.push(listingText.join(' '));

}

return outputTextList.join(' ')
}