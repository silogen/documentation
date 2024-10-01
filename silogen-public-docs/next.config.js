export default {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/admin/index.html",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
  output: "standalone",
};
