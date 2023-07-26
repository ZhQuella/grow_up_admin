import { Fn } from "types/public";

interface props  {
  emits: Fn
};

export const useEvents = ({
  emits
}: props) => {

  const onDraggableAdd = (event) => {
    emits("add", event);
  };


  return {
    onDraggableAdd
  }
};

