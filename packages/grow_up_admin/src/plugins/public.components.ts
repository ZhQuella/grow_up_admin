import type { App } from "vue";
import { GDetail, GDetailItem, GDialog,GSplitPane } from "grow_components";
import PageLayout from "components/public/PageLayout/index.vue";
console.log('能拿到么',GSplitPane)
export default (app: App) => {
  app.component(PageLayout.name, PageLayout);

  app.component(GDialog.name, GDialog);
  app.component(GDetail.name, GDetail);
  app.component(GDetailItem.name, GDetailItem);
  app.component(GSplitPane.name, GSplitPane);
};
