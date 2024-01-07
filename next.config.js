/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
    SUPABASE_ENDPOINT: process.env.SUPABASE_ENDPOINT,
    SUPABASE_ANON_TOKEN: process.env.SUPABASE_ANON_TOKEN,
  },
};

module.exports = nextConfig;
