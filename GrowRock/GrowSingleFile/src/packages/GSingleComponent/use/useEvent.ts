import { ref } from "vue";
import { defaultTemplate } from "../../../static/tempalteStr";

export const useEvent = ({ codeOptions, tabsActive, codemirrorRef }) => {
  const dialogVisible = ref(false);

  const onHandleTabsAdd = () => {
    dialogVisible.value = true;
  };

  const onSubmit = ({ fileName }) => {
    codeOptions.value.files[fileName] = defaultTemplate;
    tabsActive.value = fileName;
    codemirrorRef.value.setDoc(codeOptions.value.files[fileName]);
    onClose();
  };

  const onClose = () => {
    dialogVisible.value = false;
  };

  return {
    onHandleTabsAdd,
    dialogVisible,
    onSubmit,
    onClose
  };
};
