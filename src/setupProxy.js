const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api.php",
    createProxyMiddleware({
      target: "https://cxuxdev12.cafe24.com/api",
      changeOrigin: true,
      secure: false,
    })
  );
};