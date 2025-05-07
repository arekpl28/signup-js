/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.87:3000",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msgdsilvleezzhbqdjrn.supabase.co",
        pathname: "/**",
      },
    ],
  },

  // Aby HMR widział zmiany także w katalogu /locales
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        ignored: ["**/node_modules/**", "!**/locales/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
