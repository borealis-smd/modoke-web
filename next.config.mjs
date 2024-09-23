/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "projeto-modoke.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
