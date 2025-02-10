import type { App } from "vue";

import "plugin/style.plugin";

import scriptPlugin from "plugin/script.plugin";
import publicComponents from "plugin/public.components";
import language from "language/index";
import enrollIcon from "@/assets/icon";

const styleConflict = () => {
  const meta = document.createElement("meta");
  meta.name = "naive-ui-style";
  document.head.appendChild(meta);
};

export default (app: App) => {
  styleConflict();
  scriptPlugin(app);
  publicComponents(app);
  language(app);
  enrollIcon(app);
};
