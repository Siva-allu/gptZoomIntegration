const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

async function joinGoogleMeet(meetingLink) {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    // headless: false,
    args: ["--enable-automation","--use-fake-device-for-media-stream", // Use dummy camera
      "--use-fake-ui-for-media-stream", ],
    // ignoreDefaultArgs: true
  });

  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();

  try {
    
  await page.goto(meetingLink);
  const allowSelector = await page.$('[aria-label="Do you want people to see and hear you in the meeting?"]');
  console.log(allowSelector)
  if(allowSelector){
  // await page.waitForSelector('[aria-label="Do you want people to see and hear you in the meeting?"]');
  await page.keyboard.press('Enter');
  }
 
  // const useWithGoogleAccount= await page.$('[')
  await page.waitForSelector('[aria-label="Your name"]');
  await page.type('[aria-label="Your name"]', 'voiceGPT');
  await page.keyboard.press('Enter');
  
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    console.log("returning");
    return "Sucess";
    // await browser.close();
  }
}

module.exports = {joinGoogleMeet};