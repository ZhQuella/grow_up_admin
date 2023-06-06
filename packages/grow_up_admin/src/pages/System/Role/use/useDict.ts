import { onMounted, reactive, toRefs, computed } from "vue";
import axios from "api/Dictionary";

export const useDict = () => {
  const dictMethods = axios.create("dicts", ["getPublicState", "getRoleType"]);
  const state: any = reactive({
    roleStates: [],
    roleTypes: []
  });

  const getRoleState = async () => {
    const { dictList } = await dictMethods.getPublicState();
    state.roleStates = dictList;
  };

  const getRoleType = async () => {
    const { dictList } = await dictMethods.getRoleType();
    state.roleTypes = dictList;
  };

  const dictMap = computed(() => state);

  onMounted(() => {
    getRoleState();
    getRoleType();
  });

  return {
    ...toRefs(dictMap.value)
  };
};
