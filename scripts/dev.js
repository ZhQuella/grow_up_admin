import { execa } from "execa";

async function buildAll() {
  execa("pnpm", ["run", "grow-component:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow-designer:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow-editor:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow-flow:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow-single-file:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow-utils:dev"], { stdio: "inherit" });
  await execa("pnpm", ["run", "sample:dev"], { stdio: "inherit" });
}

buildAll();
