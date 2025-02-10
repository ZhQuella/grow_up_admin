import { ref, computed } from "vue";

import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { insertTab, indentLess } from "@codemirror/commands";
// import { oneDark } from "@codemirror/theme-one-dark";

export const initEditor = ({ emit, isReadOnly }) => {
  const editorView = ref();

  const readOnly = computed(() => isReadOnly.value);

  const getEditorState = (method, doc) => {
    return {
      doc,
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        method(),
        keymap.of([
          { key: "Tab", run: insertTab },
          { key: "Shift-Tab", run: indentLess },
          {
            key: "Cmd-s",
            run: function () {
              emit("save");
              return true;
            }
          },
          {
            key: "Ctrl-s",
            run: function () {
              emit("save");
              return true;
            }
          }
        ]),
        EditorView.updateListener.of((viewUpd) => {
          if (viewUpd.docChanged) {
            const state = viewUpd.state.toJSON();
            emit("change", state);
          }
        }),
        EditorView.editable.of(!readOnly.value),
        EditorState.readOnly.of(readOnly.value)
      ]
    };
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
  };
};
