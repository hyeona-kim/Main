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
        },
        {
          source: "/toss/:path*",
          destination: "http://localhost:8080/toss/:path*"
        },
        {
          source:"/list",
          destination: "http://localhost:5000/list"
        }
      ];
    }
};


export default nextConfig;
