import type { Ref } from "vue";
// import { reactive } from "vue";
import { nanoid } from "nanoid";

interface props {
  structures: Ref<any[]>
};

export const useEvents = ({
  structures
}: props) => {


  const onGenerateKey = (list, index) => {


    console.log(list, index);
  };

  const onDraggableStart = (item) => {
    console.log(item, "DraggableStart");
  };

  const onDraggableViewAdd = (event) => {
    const uuid:string = nanoid();
    structures.value.push({ uuid, elName: Math.random() });
  };

  return {
    onDraggableViewAdd,
    onDraggableStart,
    onGenerateKey
  };
};

