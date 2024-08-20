/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
        MARVEL_API_URL: process.env.MARVEL_API_URL,
        MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
        MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY,
    }
};

export default nextConfig;
