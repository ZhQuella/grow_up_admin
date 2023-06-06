import { onMounted, reactive, toRefs, computed } from "vue";
import axios from "api/Dictionary";

export const useDict = () => {
  const dictMethods = axios.create("dicts", ["getPublicState"]);
  const state: any = reactive({
    accountStates: []
  });

  const getAccountState = async () => {
    const { dictList } = await dictMethods.getPublicState();
    state.accountStates = dictList;
  };

  const dictMap = computed(() => state);

  onMounted(() => {
    getAccountState();
  });

  return {
    ...toRefs(dictMap.value)
  };
};
