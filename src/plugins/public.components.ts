import type { App } from "vue";
import PageLayout from "components/public/PageLayout/index.vue";

export default (app: App) => {
  app.component(PageLayout.name, PageLayout);
};
