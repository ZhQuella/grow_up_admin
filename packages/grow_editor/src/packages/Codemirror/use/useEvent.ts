
export const useEvent = ({
    editorView,
    codeEditor,
    resetEditor,
    editorValue,
    emit
}) => {

    const onModelChange = (value) => {
        codeEditor.value.innerHTML = "";
        resetEditor(codeEditor.value, value.method);
        emit("lang-change", value);
    };

    const onCleanEditor= () => {
        codeEditor.value.innerHTML = "";
        resetEditor(codeEditor.value, editorValue.value.method);
    }

    const toJSON = () => {
        return editorView.value.state.toJSON();
    };

    const setDoc = (doc, isRunChange = false) => {
        codeEditor.value.innerHTML = "";
        resetEditor(codeEditor.value, editorValue.value.method, doc);
        isRunChange && emit("change", editorView.value.state.toJSON());
    }

    return {
        onCleanEditor,
        onModelChange,
        toJSON,
        setDoc
    }
}
