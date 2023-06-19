import type { Ref } from "vue";
import type { DictItem } from "types/Dict";
import { ref, onMounted } from "vue";
import dictAxios from "api/Dictionary";

interface DictRequest {
  getMenuType: Fn;
  getPublicState: Fn;
};

export const useDict = () => {

  const dictRequest = dictAxios.create("dicts", ["getMenuType","getPublicState"]);
  const menuTypeDicts: Ref<DictItem[]> = ref([]);
  const stateList: Ref<DictItem[]>  = ref([]);

  const getMenuType = async () => {
    const { dictList = [] } = await dictRequest.getMenuType();
    menuTypeDicts.value = [...dictList];
  };

  const getStates = async () => {
    const { dictList } = await dictRequest.getPublicState();
    stateList.value = [...dictList];
  };

  onMounted(async () => {
    await getMenuType();
    await getStates();
  });

  return {
    menuTypeDicts,
    stateList
  };
};

