import { App, Component } from "vue";
import { version } from "../package.json";
import { GWorkFlow } from "./packages/GWorkFlow";

import "animate.css";
import "./styles/tailwindcss/index.css";
import "./styles/animate/index.css";

const components: Component[] = [GWorkFlow];

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
  GWorkFlow
};

export { version, GWorkFlow };

export default GrowConponent;
