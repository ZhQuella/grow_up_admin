import { ref, nextTick } from "vue";

export const useDrawer = () => {

    const drawerRef = ref(false);
    const importMapRef= ref();
    const catchImportRef = ref({});

    const onShowImportMap = async () => {
        drawerRef.value = true;
        await nextTick();
        importMapRef.value.setCode(catchImportRef.value);
    };

    const onImportSubmit = (data) => {
        catchImportRef.value = data;
        drawerRef.value = false;
    };

    return {
        drawerRef,
        importMapRef,
        catchImportRef,
        onImportSubmit,
        onShowImportMap
    }
}
