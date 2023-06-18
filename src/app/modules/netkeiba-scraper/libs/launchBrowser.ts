import puppeteer from 'puppeteer';

export const launchBrowser = async () => {
  console.log('🏇 Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  return { browser, page };
};
