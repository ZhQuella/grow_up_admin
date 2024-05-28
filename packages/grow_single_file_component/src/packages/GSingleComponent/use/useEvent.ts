import { ref } from "vue";
import { defaultTemplate } from "../../../static/tempalteStr";

export const useEvent = ({
   options,
   tabsActive,
   codemirrorRef
}) => {
    const dialogVisible = ref(false);


    const onHandleTabsAdd = () => {
        dialogVisible.value = true;
    };

    const onSubmit = ({ fileName }) => {
        options.files[fileName] = defaultTemplate;
        tabsActive.value = fileName;
        codemirrorRef.value.setDoc(options.files[fileName]);
        onClose();
    };

    const onClose = () => {
        dialogVisible.value = false;
    }


    return {
        onHandleTabsAdd,
        dialogVisible,
        onSubmit,
        onClose
    }
}

