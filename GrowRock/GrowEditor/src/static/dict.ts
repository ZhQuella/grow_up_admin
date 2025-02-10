import { javascript } from "@codemirror/lang-javascript";
import { vue } from "@codemirror/lang-vue";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";
import { sql } from "@codemirror/lang-sql";

export const selectMap = [
  {
    label: "JavaScript",
    value: "javascript",
    method: javascript
  },
  {
    label: "Css",
    value: "css",
    method: css
  },
  {
    label: "Vue",
    value: "vue",
    method: vue
  },
  {
    label: "HTML",
    value: "html",
    method: html
  },
  {
    label: "SQL",
    value: "sql",
    method: sql
  },
  {
    label: "Json",
    value: "json",
    method: json
  }
];
