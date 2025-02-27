import type { App, Component } from "vue";
import { version } from "../package.json";
import { GCountTo } from "./packages/GCountTo";
import { GDetail, GDetailItem } from "./packages/GDetail";
import { GDialog } from "./packages/GDialog";
import { GSplitPane } from "./packages/GSplitPane";
import { GOverFlowList } from "./packages/GOverFlowList";

import "./styles/tailwindcss/index.css";

declare type PluginInstallFunction = (app: App, ...options: any[]) => any;

const components: Component[] = [GCountTo, GDetail, GDetailItem, GDialog, GSplitPane];

const install: PluginInstallFunction = (app: App) => {
  const useComponent = (component: Component) => {
    if (component.name) {
      app.component(component.name, component);
    } else {
      throw "component need name";
    }
  };
  components.forEach((component: Component) => {
    useComponent(component);
  });
};

const GrowConponent = {
  version,
  install,
  GCountTo,
  GDetail,
  GDetailItem,
  GDialog,
  GSplitPane,
  GOverFlowList
};

export { version, GCountTo, GDetail, GDetailItem, GDialog, GSplitPane, GOverFlowList };

export default GrowConponent;
