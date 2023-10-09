
interface props {
  draggableConfig: any
};

export const useEvents = ({
  draggableConfig
}: props) => {


  const onGenerateKey = (list, index) => {
    console.log(list, index);
  };

  const onDraggableStart = (item) => {
    console.log(item, "DraggableStart");
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
    draggableConfig.renderArgument[uuid] = draggableConfig.renderArgument[uuid] || {};
    draggableConfig.renderArgument[uuid] = {...renderArgument,...draggableConfig.renderArgument[uuid],};
    draggableConfig.styles[uuid] = draggableConfig.styles[uuid] || {};
    draggableConfig.events[uuid] = draggableConfig.events[uuid] || {};
    draggableConfig.props[uuid] = draggableConfig.props[uuid] || {};
  };

  return {
    onDraggableViewAdd,
    onDraggableStart,
    onGenerateKey
  };
};

