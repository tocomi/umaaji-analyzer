export const DOMAIN =
  process.env.ENV_TYPE === 'vercel'
    ? 'https://vercel.com/tocomi/umaaji-analyze.com'
    : 'http://localhost:3000';
