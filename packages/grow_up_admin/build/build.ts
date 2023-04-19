export const createBuild = (): any => {
  return {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id: string[]) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  };
};
