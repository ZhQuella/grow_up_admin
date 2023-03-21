import type { App } from "vue";
import * as antd from "@vicons/antd";
import * as carbon from "@vicons/carbon";

const withe = ["Label"];

export default (app: App) => {
  const iconMap = {
    ...antd,
    ...carbon,
  };

  for (let name in iconMap) {
    if (withe.includes(name)) {
      name = `Icon${name}`;
    }
    app.component(name, Reflect.get(iconMap, name));
  }
};
