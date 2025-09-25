// craco.config.js
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, "src")],
        },
      },
    },
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000, // 필요에 따라 포트 지정
    allowedHosts: "all", // 외부 접속 허용 (옵션)
  },
};
