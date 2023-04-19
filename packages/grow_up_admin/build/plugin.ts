import type { Plugin, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import { terser } from "rollup-plugin-terser";
import viteImagemin from "vite-plugin-imagemin";
import commonjs from "@rollup/plugin-commonjs";
import { viteMockServe } from "vite-plugin-mock";
import vueJsx from "@vitejs/plugin-vue-jsx";

const root = process.cwd();

export const createPlugin = ({ command, mode }: ConfigEnv): Plugin[] => {
  let env = {} as any;
  const isBuild = command === "build";
  if (!isBuild) {
    env = loadEnv(
      process.argv[3] === "--mode" ? process.argv[4] : process.argv[3],
      root
    );
  } else {
    env = loadEnv(mode, root);
  }

  const vitePlugins = [];

  vitePlugins.push(commonjs());

  vitePlugins.push(vue());

  vitePlugins.push(vueJsx());

  vitePlugins.push(
    viteMockServe({
      ignore: /^_/,
      mockPath: "mock",
      localEnabled: !isBuild,
      prodEnabled: isBuild,
      injectCode: `
        import { setupProdMockServer } from '../mock/_createProductionServer'
        setupProdMockServer()
      `,
    })
  );

  vitePlugins.push(
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    })
  );

  vitePlugins.push(visualizer());

  vitePlugins.push(terser());

  vitePlugins.push(
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    })
  );

  return vitePlugins;
};
