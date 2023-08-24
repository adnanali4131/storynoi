/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storynoi.s3.us-east-2.amazonaws.com", "localhost"],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "https://accounts.google.com/",
  //       permanent: false,
  //       basePath: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
