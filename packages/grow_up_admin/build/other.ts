export const createCss = () => {
  return {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "style/base/_var.scss";'
      }
    }
  };
};

export const createResolve = () => {
  return {
    alias: [
      {
        find: "@",
        replacement: "/src"
      },
      {
        find: "pages",
        replacement: "/src/pages"
      },
      {
        find: "components",
        replacement: "/src/components"
      },
      {
        find: "api",
        replacement: "/src/apis"
      },
      {
        find: "util",
        replacement: "/src/utils"
      },
      {
        find: "hooks",
        replacement: "/src/hooks"
      },
      {
        find: "types",
        replacement: "/types"
      },
      {
        find: "plugin",
        replacement: "/src/plugins"
      },
      {
        find: "style",
        replacement: "/src/styles"
      },
      {
        find: "store",
        replacement: "/src/stores"
      },
      {
        find: "setting",
        replacement: "/src/settings"
      },
      {
        find: "router",
        replacement: "/src/routers"
      },
      {
        find: "language",
        replacement: "/src/language"
      },
      {
        find: "/image",
        replacement: "/src/assets/images"
      },
      {
        find: "image",
        replacement: "/src/assets/images"
      }
    ]
  };
};
