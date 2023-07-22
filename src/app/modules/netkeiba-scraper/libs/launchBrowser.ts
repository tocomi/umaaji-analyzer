import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer';

const isVercel = process.env.ENV_TYPE === 'vercel';

const launchBrowserOnLocal = async () => {
  return puppeteer.launch({ headless: 'new' });
};

const launchBrowserOnVercel = async () => {
  return chromium.puppeteer.launch({
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });
};

export const launchBrowser = async () => {
  console.log('🏇 Launching browser...');
  const _launchBrowser = isVercel
    ? launchBrowserOnVercel
    : launchBrowserOnLocal;
  const browser = await _launchBrowser();
  const page = await browser.newPage();
  return { browser, page };
};
