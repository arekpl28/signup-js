/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msgdsilvleezzhbqdjrn.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
