/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  
  // TypeScript configuration
  typescript: {
    // Don't ignore TypeScript errors during build
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    // Don't ignore ESLint errors during build
    ignoreDuringBuilds: false,
  },
  
  // Performance optimizations
  experimental: {
    // Optimize package imports for better tree shaking
    optimizePackageImports: [
      'react-icons',
      'react-toastify',
      '@/components',
      '@/utils',
    ],
  },
  
  // Environment variables that should be available on the client
  env: {
    CUSTOM_KEY: 'apartment-pulse',
  },
};

module.exports = nextConfig;
