import { execa } from "execa";

async function buildAll() {
    await execa("pnpm", ["run", "grow-component:build"], { stdio: "inherit" });
    await execa("pnpm", ["run", "grow-designer:build"], { stdio: "inherit" });
    await execa("pnpm", ["run", "grow-editor:build"], { stdio: "inherit" });
    await execa("pnpm", ["run", "grow-flow:build"], { stdio: "inherit" });
    await execa("pnpm", ["run", "grow-single-file:build"], { stdio: "inherit" });
    await execa("pnpm", ["run", "grow-utils:build"], { stdio: "inherit" });
    await execa("pnpm", ["run", "sample:build"], { stdio: "inherit" });
}

buildAll();
