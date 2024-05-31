import { App, Component } from "vue";
import { version } from "../package.json";

import { GSingleComponent } from "./packages/GSingleComponent";
import { GSingleRenderView } from "./packages/GSingleRenderView";

import "animate.css";
import "grow_editor/dist/index.css";
import "grow_components/dist/index.css";
import "./styles/tailwindcss/index.css";
import "./styles/animate/index.css";

const components: Component[] = [
  GSingleComponent,
  GSingleRenderView
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
  GSingleComponent,
  GSingleRenderView
};

export { version, GSingleComponent, GSingleRenderView };

export default GrowConponent;
