import { defineStore } from "pinia";
import { storageExample } from "@grow-rock/grow-utils";
import { IS_LOCK_SCREEN, CRACKING_TIMES } from "@/assets/enums/cacheEnum";

export const useLockScreen = defineStore({
  id: "LockScreen",
  state: () => ({
    isLockScreen: storageExample.get(IS_LOCK_SCREEN, false),
    crackingTimes: storageExample.get(CRACKING_TIMES, 0)
  }),
  getters: {
    getLocale(): boolean {
      return this.isLockScreen;
    },
    getCrackingTimes(): number {
      return this.crackingTimes;
    }
  },
  actions: {
    setIsLockScreen(value: boolean): void {
      this.isLockScreen = value;
      storageExample.set(IS_LOCK_SCREEN, value);
    },
    setCrackingTimes(value: number): void {
      this.crackingTimes = value;
      storageExample.set(CRACKING_TIMES, value);
    }
  }
});
