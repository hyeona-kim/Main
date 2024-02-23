/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode : false,

    compiler: {
        styledComponents: true
      },

    async rewrites() {
      return[
        {
          source: "/login/:path*",
          destination: "http://localhost:8080/login/:path*"
        }
      ];
    }
};


export default nextConfig;
