import { ref } from "vue";

import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { insertTab, indentLess } from "@codemirror/commands";
// import { oneDark } from "@codemirror/theme-one-dark";

export const initEditor = ({
    emit
}) => {

    const editorView = ref();

    const getEditorState = (method, doc) => {
        return {
            doc,
            extensions: [
                basicSetup,
                keymap.of(defaultKeymap),
                method(),
                keymap.of([
                    { key: "Tab", run: insertTab },
                    { key: 'Shift-Tab', run: indentLess }
                ]),
                EditorView.updateListener.of((viewUpd) => {
                    if (viewUpd.docChanged) {
                        const state = viewUpd.state.toJSON();
                        emit("change", state);
                    }
                })
            ]
        }
    };

    const resetEditor = (parent: HTMLDivElement, method, doc = ""): void => {
        editorView.value = new EditorView({
            state: EditorState.create(getEditorState(method, doc)),
            parent
        });
    };

    return {
        resetEditor,
        editorView
    }
}
