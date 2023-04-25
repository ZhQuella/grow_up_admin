import type { App } from "vue";
import { GDetail, GDetailItem, GDialog } from "grow_components";
import PageLayout from "components/public/PageLayout/index.vue";

export default (app: App) => {
  app.component(PageLayout.name, PageLayout);

  app.component(GDialog.name, GDialog);
  app.component(GDetail.name, GDetail);
  app.component(GDetailItem.name, GDetailItem);
};
