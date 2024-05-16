import { App, Component } from "vue";
import { version } from "../package.json";
import { WorkFlow } from "./packages/WorkFlow";

import "animate.css";
import "./styles/tailwindcss/index.css";
import "./styles/animate/index.css";

const components: Component[] = [
  WorkFlow
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
  WorkFlow
};

export { version, WorkFlow };

export default GrowConponent;
