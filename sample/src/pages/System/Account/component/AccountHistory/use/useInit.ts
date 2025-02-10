import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import to from "await-to-js";
import axios from "api/systemMent";

interface prop {
  id: string;
  emit: Fn;
}

export const useInit = ({ id, emit }: prop) => {
  const accountMethod = axios.create("accountMent");
  const historyList = ref([]);

  const getAccountHistoryList = async () => {
    const [error, { historyList: result }]: any[] = await to(
      accountMethod.accountHistory({ params: { id } })
    );
    if (error) {
      const { message } = error;
      ElMessage.error(message);
      emit("close");
      return;
    }
    historyList.value = result;
  };

  onMounted(() => {
    getAccountHistoryList();
  });

  return {
    historyList
  };
};
