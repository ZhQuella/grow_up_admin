import { App, Component } from "vue";
import { version } from "../package.json";

import { GCountTo } from "./packages/GCountTo";
import { GDetail, GDetailItem } from "./packages/GDetail";
import { GDialog } from "./packages/GDialog";
import { SplitPane } from "./packages/SplitPane";

const components: Component[] = [
  GCountTo,
  GDetail,
  GDetailItem,
  GDialog,
  SplitPane
];

const install = (app: App) => {
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
  SplitPane
};

export { 
  version, 
  GCountTo,
  GDetail,
  GDetailItem,
  GDialog,
  SplitPane
};

export default GrowConponent;
