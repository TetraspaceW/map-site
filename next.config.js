/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: { GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY },
};

module.exports = nextConfig;
