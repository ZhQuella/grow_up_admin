import { computed, ref } from "vue";

export const useTabsOption = ({
    options,
    codemirrorRef
}) => {

    const tabsActive = ref("App.vue");

    const tabsOptions = computed(() => {
        return Object.keys(options.files).filter((key) => {
            const [,type]:any = key.match(/\.([^.]+)$/);
            return type === "vue";
        }).map(el => {
            return {
                label: el,
                name: el
            };
        });
    });

    const onTabChange = () => {
        codemirrorRef.value.setDoc(options.files[tabsActive.value]);
    };

    const onTabsRemove = (key: string) => {
        const index = Math.max(tabsOptions.value.findIndex(el => el.name === key) - 1, 0);
        tabsActive.value = tabsOptions.value[index].name;
        Reflect.deleteProperty(options.files,key);
    };

    return {
        tabsActive,
        tabsOptions,
        onTabChange,
        onTabsRemove
    }
}

