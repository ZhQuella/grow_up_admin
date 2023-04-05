import type { App } from "vue";
import PageLayout from "components/public/PageLayout/index.vue";
import GDialog from "components/public/GDialog/index.vue";
import { GDetail, GdetailItem } from "components/public/GDetail";

export default (app: App) => {
  app.component(PageLayout.name, PageLayout);
  app.component(GDialog.name, GDialog);

  app.component(GDetail.name, GDetail);
  app.component(GdetailItem.name, GdetailItem);
};
