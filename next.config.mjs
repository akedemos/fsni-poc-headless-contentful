import env from "./.secrets.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: `/${env.spaceId}/**`,
      },
    ],
  },
};

export default nextConfig;
