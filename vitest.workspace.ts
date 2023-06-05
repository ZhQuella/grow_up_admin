import { defineWorkspace, mergeConfig } from 'vitest/config';
import viteConfig from "./vite.config";

export default defineWorkspace([
  {
    test: {
      name: 'grow_up_admin',
      root: './packages/grow_up_admin',
      environment: 'jsdom'
    },
  },
  mergeConfig(viteConfig, {
    test: {
      name: "grow_components",
      root: "./packages/grow_components",
      environment: "jsdom"
    }
  })
]);
