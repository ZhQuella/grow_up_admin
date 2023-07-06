import { reactive } from "vue";

export const useOption = () => {

  const optionConfig = reactive({
    title: "",
    visible: true,
    componentName: "moduleOptions",
    type: "BaseComponent",
    isFixed: true
  });

  const optionTypeMap = {
    module: {
      title: "组件库",
      componentName: "moduleOptions"
    }
  };

  const onLeftOptionClick = (type: string) => {
    if(optionConfig.type === type){
      optionConfig.visible = false;
      optionConfig.title = "";
      optionConfig.componentName = "";
      optionConfig.type = "";
      return;
    }
    optionConfig.visible = true;
    optionConfig.title = optionTypeMap[type].title;
    optionConfig.componentName = optionTypeMap[type].componentName;
    optionConfig.type = type;
  };

  const onLeftOptionClose = () => {
    !optionConfig.isFixed && onLeftClose();
  };

  const onLeftClose = () => {
    optionConfig.visible = false;
    optionConfig.title = "";
    optionConfig.componentName = "";
    optionConfig.type = "";
  }

  const onChangeOptionFixed = () => {
    optionConfig.isFixed = !optionConfig.isFixed;
  };

  return {
    optionConfig,
    onLeftOptionClick,
    onLeftOptionClose,
    onChangeOptionFixed,
    onLeftClose
  };

};

