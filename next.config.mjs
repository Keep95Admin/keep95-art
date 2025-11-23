import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force Webpack dev server (disable Turbopack)
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,  // Poll for changes on Windows
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
