import { defineConfig } from "rollup";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-typescript2";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json" assert { type: "json" };
console.log(compileTemplate);
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
    resolve(),
    babel({
      exclude: "node_modules/**",
      presets: ["@vue/babel-preset-jsx"],
      babelHelpers: "bundled"
    }),
    commonjs(),
    ts(),
    jsx(),
    vue({
      target: 'browser',
      preprocessStyles: true,
      template: {
        isProduction: true
      }
    }),
    json(),
    terser(),
    postcss()
  ],
  external: ["Vue", "element-plus"]
});
