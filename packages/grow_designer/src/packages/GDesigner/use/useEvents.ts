
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

  const onDraggableViewAdd = ({ event, list }) => {
    const newIndex = event.newIndex;
    const config = list[newIndex];
    const { uuid, ...otherConfig } = config;
    list[newIndex] = { uuid };
    draggableConfig.renderArgument[uuid] = { ...otherConfig };
    draggableConfig.styles[uuid] = {};
    draggableConfig.events[uuid] = {};
  };

  return {
    onDraggableViewAdd,
    onDraggableStart,
    onGenerateKey
  };
};

