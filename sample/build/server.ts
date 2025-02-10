export const createServer = () => {
  return {
    base: "/",
    port: 3000,
    hmr: {
      overlay: false
    },
    host: "0.0.0.0",
    proxy: {
      "/mock": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/mock/, "")
      }
    }
  };
};
