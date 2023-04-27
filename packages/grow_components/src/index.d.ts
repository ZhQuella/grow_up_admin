import { App } from "vue";
import { version } from "../package.json";
declare const GrowConponent: {
  version: string;
  install: (app: App) => void;
  GButton: import("vue").DefineComponent<
    {},
    {},
    {},
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    {},
    string,
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    Readonly<import("vue").ExtractPropTypes<{}>>,
    {}
  >;
};
export { version };
export default GrowConponent;
