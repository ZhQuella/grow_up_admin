import { computed, reactive } from "vue";
import createDict from "pages/System/Dict/components/createDict.vue"


export const useTableFunc = () => {



  const dialogConfig = reactive({
    visible: false,
    conmponetName: "",
    title: "",
    data: {}
  })

  const buttonGroup = computed(() => {

  });
  const optionGroup = computed(() => [
    {
      title: "新增",
      type: "success",
      icon: "Add",
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
      func: (): void => {
        dialogConfig.visible = true;
        dialogConfig.title = `新增菜单`;
        dialogConfig.conmponetName = "createDict";
        dialogConfig.data = {}
      }
    }
  ])
  return {
    dialogConfig,
    buttonGroup,
    optionGroup
  }
}