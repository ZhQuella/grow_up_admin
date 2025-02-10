import { computed, reactive } from "vue";
import createMenu from "pages/System/Menu/components/createMenu.vue";

export const useTableFunc = () => {
  const dialogConfig = reactive({
    visible: false,
    conmponetName: "",
    title: "",
    data: {}
  });

  const buttonGroup = computed(() => []);

  const optionGroup = computed(() => [
    {
      title: "新增",
      type: "success",
      icon: "Add",
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
      func: (): void => {
        dialogConfig.visible = true;
        dialogConfig.title = `新增菜单`;
        dialogConfig.conmponetName = "createMenu";
        dialogConfig.data = {};
      }
    }
  ]);

  return {
    dialogConfig,
    buttonGroup,
    optionGroup
  };
};
