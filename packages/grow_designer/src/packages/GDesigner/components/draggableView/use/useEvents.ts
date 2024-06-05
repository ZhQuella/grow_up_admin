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

  const onSpecialAdd = (event) => {
    emits('special', event);
  };

  const onActiveed = (event) => {
    emits('active', event);
  };

  const onDeleteItem = (event) => {
    emits('delete', event);
  }

  return {
    onDraggableAdd,
    onSpecialAdd,
    onActiveed,
    onDeleteItem
  }
};

