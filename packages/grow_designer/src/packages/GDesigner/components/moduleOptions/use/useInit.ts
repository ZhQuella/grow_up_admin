import { Ref } from "vue";
import { ref, computed, onMounted } from "vue";
import { BaseComponent } from "../../../static/moduleMap";

export const useInit = () => {

  const list: Ref<any> = ref();
  const currentUse = ref({});
  const activeName = ref("BaseComponent");
  const collapseModel: Ref<string[]> = ref([]);

  const drageMap = computed(() => {
    const drageConfig = {
      BaseComponent
    };
    return drageConfig[activeName.value] || new Map();
  });

  onMounted(() => {
    collapseModel.value = [...drageMap.value.keys()];
  });

  return {
    list,
    currentUse,
    activeName,
    drageMap,
    collapseModel
  };
};

