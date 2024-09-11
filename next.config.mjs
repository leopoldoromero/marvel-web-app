/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
        MARVEL_API_URL: process.env.NEXT_PUBLIC_MARVEL_API_URL,
        MARVEL_PUBLIC_KEY: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY,
        MARVEL_PRIVATE_KEY: process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY,
        NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_MARVEL_API_URL || 'NEXT_PUBLIC_TEST'
    }
};

export default nextConfig;
