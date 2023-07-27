export const DOMAIN =
  process.env.ENV_TYPE === 'vercel'
    ? 'https://netkeiba-scraper-xhru3qvyuq-an.a.run.app'
    : 'http://localhost:8080';
