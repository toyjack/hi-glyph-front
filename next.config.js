/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["glyph.lab.hi.u-tokyo.ac.jp"],
    
  },
};

module.exports = nextConfig
