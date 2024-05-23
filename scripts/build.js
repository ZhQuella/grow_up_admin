import { execa } from "execa";

async function buildAll() {
  await execa("pnpm", ["run", "grow_com:build"], { stdio: "inherit" });
  await execa("pnpm", ["run", "grow_des:build"], { stdio: "inherit" });
  await execa("pnpm", ["run", "grow_flow:build"], { stdio: "inherit" });
  await execa("pnpm", ["run", "grow_icon:build"], { stdio: "inherit" });
  await execa("pnpm", ["run", "grow_editor:build"], { stdio: "inherit" });
  await execa("pnpm", ["run", "grow_utils:build"], { stdio: "inherit" });
  await execa("pnpm", ["run", "grow_admin:build"], { stdio: "inherit" });
}

buildAll();
