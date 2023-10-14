import { Ref } from "vue";
import { ref, computed, onMounted } from "vue";
import { AtomicComponent, BaseComponent, BusinessComponent } from "../../../static/moduleMap";

export const useInit = () => {

  const list: Ref<any> = ref();
  const currentUse = ref({});
  const activeName = ref("BaseComponent");
  const collapseModel: Ref<string[]> = ref([]);

  const drageMap = computed(() => {
    const drageConfig = {
      BaseComponent,
      AtomicComponent,
      BusinessComponent
    };
    return drageConfig[activeName.value] || new Map();
  });

  const onTableChange = () => {
    collapseModel.value = [...drageMap.value.keys()];
  }

  onMounted(() => {
    onTableChange();
  });

  return {
    list,
    currentUse,
    activeName,
    drageMap,
    collapseModel,
    onTableChange
  };
};

