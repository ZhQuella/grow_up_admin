import type { App } from "vue";
import {
  GDetail,
  GDetailItem,
  GDialog,
  GSplitPane,
  GOverFlowList
} from "@grow-rock/grow-component";
import PageLayout from "components/public/PageLayout/index.vue";

export default (app: App) => {
  app.component(PageLayout.name, PageLayout);
  app.component(GDialog.name, GDialog);
  app.component(GDetail.name, GDetail);
  app.component(GDetailItem.name, GDetailItem);
  app.component(GSplitPane.name, GSplitPane);
  app.component(GOverFlowList.name, GOverFlowList);
};
