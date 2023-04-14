import { App, Component } from "vue";
import { version } from "../package.json";

import { GButton } from "./packages/Button";

const components: Component[] = [GButton];

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
  GButton
};

export { version };

export default GrowConponent;
