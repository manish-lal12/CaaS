/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "static.aaraz.me"
        }],
    }
};

export default nextConfig;
