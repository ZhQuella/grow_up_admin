import { ref } from "vue";

import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
// import { oneDark } from "@codemirror/theme-one-dark";

export const initEditor = () => {

    const editorView = ref();

    const resetEditor = (parent: HTMLDivElement, method): void => {
        editorView.value = new EditorView({
            state: EditorState.create({
                doc: "",
                extensions: [
                    basicSetup,
                    keymap.of(defaultKeymap),
                    method()
                ]
            }),
            parent
        });
    }

    return {
        resetEditor,
        editorView
    }
}
