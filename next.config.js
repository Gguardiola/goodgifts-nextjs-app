/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.gabodev.com/:path*',
      },
    ]
  },
  async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET, DELETE, PATCH, POST, PUT" },
                    { key: "Access-Control-Allow-Headers", value: "Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
  async redirects() {
    const unloggedRoutes = ["/mywishlists", "/friends", "/gifts", "/profile", "/wishlists", "/feed"];
    const redirectUnlogged = unloggedRoutes.map((route) => ({
      source: route,
      missing: [
        {
          type: 'cookie',
          key: 'token',
        },
      ],
      destination: '/403',
      permanent: false,
    }));
  
    return redirectUnlogged;
  }
}


module.exports = nextConfig
