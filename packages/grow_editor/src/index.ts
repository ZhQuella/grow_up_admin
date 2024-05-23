import { App, Component } from "vue";
import { version } from "../package.json";

import { GCodemirror } from "./packages/Codemirror";

import "animate.css";
import "./styles/tailwindcss/index.css";
import "./styles/animate/index.css";

const components: Component[] = [
  GCodemirror
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
  GCodemirror
};

export { version, GCodemirror };

export default GrowConponent;
