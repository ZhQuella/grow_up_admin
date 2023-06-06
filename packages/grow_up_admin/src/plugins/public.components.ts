import type { App } from "vue";
import { GDetail, GDetailItem, GDialog, GSplitPane } from "grow_components";
import PageLayout from "components/public/PageLayout/index.vue";

export default (app: App) => {
  console.log(PageLayout);
  app.component(PageLayout.name, PageLayout);

  app.component(GDialog.name, GDialog);
  app.component(GDetail.name, GDetail);
  app.component(GDetailItem.name, GDetailItem);
  app.component(GSplitPane.name, GSplitPane);
};
