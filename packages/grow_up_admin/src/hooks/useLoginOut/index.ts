import { ElMessage, ElMessageBox } from "element-plus";
import { AUTHORITY_TOKEN, TABS_CURRENT_KEY, TABS_LIST_KEY} from "@/assets/enums/cacheEnum";
import { createStorage } from "grow_utils";
import { useRouter } from "vue-router";
import { useLockScreen } from "store/modules/LockScreen";


export const useLoginOut = ({ t }: { t: Fn }): any => {

    const storage = createStorage({ prefixKey: "", storage: sessionStorage });
    const lockScreenStore = useLockScreen();
    const { push } = useRouter();

    const loginOut = async () => {
        try {
            await ElMessageBox.confirm(t("APP_OTHER.LOGIN_OUT_PROMPT"), t("APP_OTHER.LOGIN_OUT_TITLE"), {
                confirmButtonText: t("PUBLIC.CONFIRM_TEXT"),
                cancelButtonText: t("PUBLIC.CANCEL_TEXT"),
                type: "warning" ,
                appendTo: "body",
                customStyle: {
                    zIndex: "40000"
                }
            });
            storage.remove(AUTHORITY_TOKEN);
            storage.remove(TABS_LIST_KEY);
            storage.remove(TABS_CURRENT_KEY);
            lockScreenStore.setCrackingTimes(0);
            lockScreenStore.setIsLockScreen(false);
            push({ path: "/" });
        } catch {
            ElMessage({
                type: "info",
                message: t("APP_OTHER.LOGIN_OUT_CANCEL_PROMPT")
            });
        }
    };


    return {
        loginOut
    }
}
