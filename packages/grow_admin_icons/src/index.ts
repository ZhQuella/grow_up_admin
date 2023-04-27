import { App, Component } from "vue";
import { version } from "../package.json";

const components: Component[] = [];

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
  install
};

export { version };

export default GrowConponent;
