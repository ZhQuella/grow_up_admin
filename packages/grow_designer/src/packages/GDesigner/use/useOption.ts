import { reactive, provide, ref } from "vue";
import { ACTIVE_UUID, DRAGGABLE_CONGIG } from "../config/designation";

export const useOption = () => {

  const draggableConfig = reactive({
    //  结构
    structures: [],
    //  附属信息  model/类型/props
    renderArgument: {},
    //  纯样式相关
    styles: {},
    //  事件相关
    events: {},
    //  组件参数相关
    props: {}
  });

  const activeUUID = ref("");

  provide(DRAGGABLE_CONGIG, draggableConfig);
  provide(ACTIVE_UUID, activeUUID);

  const optionConfig = reactive({
    title: "组件库",
    visible: true,
    componentName: "moduleOptions",
    type: "module",
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
    activeUUID,
    optionConfig,
    draggableConfig,
    onLeftOptionClick,
    onLeftOptionClose,
    onChangeOptionFixed,
    onLeftClose
  };

};

