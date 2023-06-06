import { Ref } from "vue";

type pageSizes = number[];
type page = Ref<number>;
type size = Ref<number>;
type layout = string;
type total = Ref<number>;

export interface PageInfo {
  pageSizes;
  page;
  size;
  layout;
  total;
}
