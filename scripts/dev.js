import { execa } from "execa";

async function buildAll() {
  await execa('pnpm', ['run', 'grow_utils:dev'], { stdio: 'inherit' });
  await execa('pnpm', ['run', 'grow_admin:dev'], { stdio: 'inherit' });
}

buildAll()
