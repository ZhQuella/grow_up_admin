import type { App } from "vue";
import PageLayout from "components/public/PageLayout/index.vue";
import GDialog from "components/public/GDialog/index.vue";
import GDetail from "components/public/GDetail/index.vue";
import GDetailItem from "components/public/GDetailItem/index.vue";

export default (app: App) => {
  app.component(PageLayout.name, PageLayout);
  app.component(GDialog.name, GDialog);

  app.component(GDetail.name, GDetail);
  app.component(GDetailItem.name, GDetailItem);
};
