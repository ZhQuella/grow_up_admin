import type { ConfigEnv } from "vite";

import { createResolve, createCss } from "./build/other";
import { createPlugin } from "./build/plugin";
import { createBuild } from "./build/build";
import { createServer } from "./build/server";

export default (env: ConfigEnv) => {
  return {
    base: "/",
    plugins: createPlugin(env),
    css: createCss(),
    resolve: createResolve(),
    build: createBuild(),
    server: createServer(),
  };
};
