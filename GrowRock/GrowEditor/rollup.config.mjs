import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "rollup";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";
const __filenameNew = fileURLToPath(import.meta.url);
const __dirnameNew = path.dirname(__filenameNew);

import pkg from "./package.json" assert { type: "json" };

const createBanner = () => {
  return `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} ${pkg.author}
  * @license ${pkg.license}
  */`;
};

export default defineConfig({
  input: "./src/index.ts",
  output: [
    {
      banner: createBanner(),
      file: "dist/index.js",
      format: "cjs"
    },
    {
      banner: createBanner(),
      file: "dist/index.esm.js",
      format: "esm",
      exports: "named"
    },
    {
      banner: createBanner(),
      file: "dist/index.umd.js",
      format: "umd",
      name: "w"
    }
  ],
  plugins: [
    peerDepsExternal(),
    vue({
      reactivityTransform: true
    }),
    postcss({
      extensions: [".css"],
      extract: true,
      plugins: [postcssImport(), tailwindcss()]
    }),
    commonjs(),
    resolve({
      preferBuiltins: true
    }),
    babel(),
    jsx(),
    esbuild(),
    json(),
    terser(),
    alias({
      entries: [{ find: "@", replacement: path.resolve(__dirnameNew, "src") }]
    })
  ],
  external: ["Vue", "element-plus"]
});
