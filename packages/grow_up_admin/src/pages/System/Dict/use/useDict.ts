import type { Ref } from "vue";
import type { DictItem } from "types/Dict";
import { ref, onMounted } from "vue"
import dictAxios from "api/Dictionary"




interface DictRequest {
  getDictType: Fn;
  getPublicState: Fn;
};



export const useDict = () => {
  const dictRequest = dictAxios.create("dicts", ["getDictType", "getPublicState"]);
  const dictTypeDicts: Ref<DictItem[]> = ref([]);
  const stateList: Ref<DictItem[]> = ref([]);


  const getDictType = async () => {
    const { dictList = [] } = await dictRequest.getDictType();
    dictTypeDicts.value = [...dictList]
  };

  const getStates = async () => {
    const { dictList } = await dictRequest.getPublicState();
    stateList.value = [...dictList]
  };
  onMounted(async () => {
    await getDictType();
    await getStates();
  });

  return {
    dictTypeDicts,
    stateList
  }
}
