import { execa } from "execa";

async function buildAll() {
  execa("pnpm", ["run", "grow_com:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow_des:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow_flow:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow_icon:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow_editor:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow_sfc:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow_utils:dev"], { stdio: "inherit" });
  execa("pnpm", ["run", "grow_admin:dev"], { stdio: "inherit" });
}

buildAll();
