import type { Ref } from "vue";
import { specificComponent } from "../static/moduleMap";
import { nanoid } from "nanoid";

interface props {
  draggableConfig: any;
  activeUUID: Ref<string>;
};

export const useEvents = ({
  draggableConfig,
  activeUUID
}: props) => {

  const onActivated = (uuid: string) => {
    activeUUID.value = uuid;
  };

  const onGenerateKey = (list, index) => {
    console.log(list, index);
  };


  const setChildren = (isChild: boolean, structure: any, children: any[]): any => {
    if(isChild){
      structure.children = (children && children.length)?children:[];
    };
    return structure;
  };

  const getIsChild = (obj1:any = {}, obj2: any = {}):boolean => {
    return Boolean(obj1.isChild || obj2.isChild);
  };

  const onDraggableViewAdd = ({ event, list }) => {
    const newIndex = event.newIndex;
    const config = list[newIndex];
    const { uuid, children, ...otherConfig } = config
    const renderArgument = { ...otherConfig };
    const isChild:boolean = getIsChild(renderArgument,draggableConfig.renderArgument[uuid]);
    const structure = setChildren(isChild,{ uuid }, children);
    list[newIndex] = structure;
    draggableConfig.renderArgument[uuid] = {...(draggableConfig.renderArgument[uuid] || {})};
    draggableConfig.renderArgument[uuid] = {...renderArgument,...draggableConfig.renderArgument[uuid],};
    draggableConfig.styles[uuid] = draggableConfig.styles[uuid] || {};
    draggableConfig.events[uuid] = draggableConfig.events[uuid] || {};
    draggableConfig.props[uuid] = draggableConfig.props[uuid] || {};
  };

  const onSpecialAdd = ({ structure, renderArgument }) => {
    const uuid = nanoid();
    const { childName } = renderArgument;
    const childRenderArgument = specificComponent.get(childName);
    const isChild = childRenderArgument?.isChild;
    const child = { uuid };
    isChild && Reflect.set(child,"children", []);
    draggableConfig.renderArgument[uuid] = {...(childRenderArgument || {})};
    console.log(draggableConfig.renderArgument[uuid]);
    draggableConfig.renderArgument[uuid] = {...renderArgument,...draggableConfig.renderArgument[uuid] };
    draggableConfig.styles[uuid] = draggableConfig.styles[uuid] || {};
    draggableConfig.events[uuid] = draggableConfig.events[uuid] || {};
    draggableConfig.props[uuid] = draggableConfig.props[uuid] || {};
    structure.children.push(child);
  }

  return {
    onSpecialAdd,
    onDraggableViewAdd,
    onGenerateKey,
    onActivated
  };
};

