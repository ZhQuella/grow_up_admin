import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import to from 'await-to-js';
import axios from "api/systemMent";

interface prop { 
  id: string;
  emit: Fn;
}


export const useInit = ({
  id,
  emit
}: prop) => { 

  const accountMethod = axios.create('accountMent');
  const usedRecordList = ref([]);

  const getAccountUsedRecordList = async () => { 
    const [error, { recordList }]: any[] = await to(accountMethod.usedRecordList({ params: { id } }));
    if (error) {
      const { message } = error;
      ElMessage.error(message);
      emit("close");
      return;
    }
    usedRecordList.value = recordList;
  };

  onMounted(() => {
    getAccountUsedRecordList();
  });

  return {
    usedRecordList
  };
};
