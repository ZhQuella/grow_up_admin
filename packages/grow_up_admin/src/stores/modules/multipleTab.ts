import type { RouteLocationNormalizedLoaded } from "vue-router";
import { toRaw } from "vue";
import { defineStore } from "pinia";
import { createStorage } from "grow_utils";
import { TABS_CURRENT_KEY, TABS_LIST_KEY } from "@/assets/enums/cacheEnum";
import { getRawRoute, findIndex } from "util/System";
import router from "router/index";
import { deleteMatched } from "util/System/index";

const storage = createStorage({ prefixKey: "", storage: sessionStorage });

interface MultipleTab {
  visitedViews: RouteLocationNormalizedLoaded[];
  activeKey: string;
  cachedViews: Set<string>;
}

export const resetWhiteNameList = ["Redirect", "Home", "NotFound"];

export const useMultipleTab = defineStore({
  id: "tabs-view",
  state: (): MultipleTab => ({
    visitedViews: JSON.parse((storage.get(TABS_LIST_KEY) || {}).value || "[]"),
    activeKey: storage.get(TABS_CURRENT_KEY) || "",
    cachedViews: new Set(),
  }),
  getters: {
    getVisitedViews(): RouteLocationNormalizedLoaded[] {
      return this.visitedViews;
    },
    getCachedViews(): string[] {
      return Array.from(this.cachedViews);
    },
  },
  actions: {
    addTabs(view: RouteLocationNormalizedLoaded) {
      this.addVisitedView(view);
      this.addCachedView();
      const visitedViewsStr = JSON.stringify(
        deleteMatched(toRaw(this.visitedViews))
      );
      storage.set(TABS_LIST_KEY, visitedViewsStr);
      storage.set(TABS_CURRENT_KEY, this.activeKey);
    },
    saveVisitedViews(visitedViews: RouteLocationNormalizedLoaded[]) {
      this.visitedViews = visitedViews;
      const visitedViewsStr = JSON.stringify(
        deleteMatched(toRaw(this.visitedViews))
      );
      storage.set(TABS_LIST_KEY, visitedViewsStr);
      storage.set(TABS_CURRENT_KEY, this.activeKey);
    },
    addVisitedView(view: RouteLocationNormalizedLoaded) {
      if (resetWhiteNameList.includes(view.name as string)) return;
      if (this.visitedViews.some((v) => v.path === view.path)) return;
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || "no-name",
        })
      );
    },
    addCachedView() {
      const cacheMap: Set<string> = new Set();
      for (const v of this.visitedViews) {
        const item = getRawRoute(v);
        const name = item?.meta?.componentName as string;
        const cache = item?.meta?.cache as boolean;
        cache !== false && name && cacheMap.add(name);
      }
      if (
        Array.from(this.cachedViews).sort().toString() ===
        Array.from(cacheMap).sort().toString()
      )
        return;
      this.cachedViews = cacheMap;
      this.saveVisitedViews(this.visitedViews);
    },
    delView(view: RouteLocationNormalizedLoaded) {
      this.delVisitedView(view);
      this.addCachedView();
    },
    delVisitedView(view: RouteLocationNormalizedLoaded) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1);
          break;
        }
      }
      const visitedViewsStr = JSON.stringify(
        deleteMatched(toRaw(this.visitedViews))
      );
      storage.set(TABS_LIST_KEY, visitedViewsStr);
    },
    delCachedView() {
      const route = router.currentRoute.value;
      const index = findIndex<string>(
        this.getCachedViews,
        (v: string) => v === route?.meta?.componentName
      );
      if (index > -1) {
        this.cachedViews.delete(this.getCachedViews[index]);
      }
    },
    updateVisitedView(view: RouteLocationNormalizedLoaded) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
    // 删除右侧
    delRightViews(view: RouteLocationNormalizedLoaded) {
      const index = findIndex<RouteLocationNormalizedLoaded>(
        this.visitedViews,
        (v) => v.path === view.path
      );
      if (index > -1) {
        this.visitedViews = this.visitedViews.filter((v, i) => {
          return v?.meta?.default || v.path === view.path || i < index;
        });
        this.addCachedView();
      }
    },
    // 删除左侧
    delLeftViews(view: RouteLocationNormalizedLoaded) {
      const index = findIndex<RouteLocationNormalizedLoaded>(
        this.visitedViews,
        (v) => v.path === view.path
      );
      if (index > -1) {
        this.visitedViews = this.visitedViews.filter((v, i) => {
          return v?.meta?.default || v.path === view.path || i > index;
        });
        this.addCachedView();
      }
    },
    // 删除其他
    delOthersViews(view: RouteLocationNormalizedLoaded) {
      this.delOthersVisitedViews(view);
      this.addCachedView();
    },
    // 删除其他tag
    delOthersVisitedViews(view: RouteLocationNormalizedLoaded) {
      this.visitedViews = this.visitedViews.filter((v) => {
        return v?.meta?.default || v.path === view.path;
      });
    },
    delAllViews() {
      this.delAllVisitedViews();
      this.addCachedView();
    },
    // 删除所有tag
    delAllVisitedViews() {
      const affixTags = this.visitedViews.filter((tag) => tag.meta.default);
      this.visitedViews = affixTags;
    },
  },
});
