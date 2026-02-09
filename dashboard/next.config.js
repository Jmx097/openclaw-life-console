/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  env: {
    DATA_DIR: '/home/ubuntu/.openclaw/workspace/data'
  }
}

module.exports = nextConfig
