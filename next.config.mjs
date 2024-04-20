/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'assets.vercel.com',
    //     port: '',
    //     pathname: '/image/upload/**',
    //   },
    // ],
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
};

export default nextConfig;
