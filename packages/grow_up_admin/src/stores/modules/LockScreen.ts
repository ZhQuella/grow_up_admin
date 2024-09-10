import { defineStore } from "pinia";
import { storageExample } from "grow_utils";
import {IS_LOCK_SCREEN, LOCALE_KEY} from "@/assets/enums/cacheEnum";

export const useLockScreen = defineStore({
   id: "LockScreen",
   state: () => ({
        isLockScreen: storageExample.get(IS_LOCK_SCREEN, false)
   }),
   getters: {
        getLocale(): boolean {
            return this.isLockScreen;
        }
   },
    actions: {
        setIsLockScreen(value: boolean): void {
            this.isLockScreen = value;
            storageExample.set(IS_LOCK_SCREEN, value);
        }
    }
});