import type { ConfigEnv } from 'vite';

import { createResolve, createCss } from "./build/vite/other";
import { createPlugin } from './build/vite/plugin';
import { createBuild } from "./build/vite/build";
import { createServer } from "./build/vite/server";


export default (env: ConfigEnv) => { 

  return {
    plugins: createPlugin(env),
    css: createCss(),
    resolve: createResolve(),
    build: createBuild(),
    server: createServer()
  }
}
