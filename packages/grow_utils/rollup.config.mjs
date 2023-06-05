import { defineConfig } from "rollup";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import esbuild from 'rollup-plugin-esbuild';
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

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
    resolve({
      preferBuiltins: true
    }),
    commonjs(),
    json(),
    esbuild(),
    babel(),
    terser()
  ]
});
