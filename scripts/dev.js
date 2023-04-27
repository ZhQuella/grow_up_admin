import { execa } from "execa";

async function buildAll() {
  execa("pnpm", ["run", "grow_com:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow_icon:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow_utils:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow_admin:dev"], { stdio: "inherit" });
}

buildAll();
