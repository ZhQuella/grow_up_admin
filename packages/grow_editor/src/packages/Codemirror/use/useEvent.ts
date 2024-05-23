

export const useEvent = ({
    editorView,
    codeEditor,
    resetEditor, editorValue
}) => {

    const onModelChange = (value) => {
        codeEditor.value.innerHTML = "";
        resetEditor(codeEditor.value, value.method);
    };

    const onCleanEditor= () => {
        codeEditor.value.innerHTML = "";
        resetEditor(codeEditor.value, editorValue.value.method);
    }

    return {
        onCleanEditor,
        onModelChange
    }
}
