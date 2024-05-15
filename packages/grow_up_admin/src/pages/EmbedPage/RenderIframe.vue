<template>
  <div v-if="isShowFrame">
    <div v-for="(frame) in framePages"
         :key="frame.name"
         class="h-full"
         v-show="showIframe(frame)">
      <FramePage :src="frame.meta.iframeSrc"
                 class="w-full h-full enter-y"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, unref } from "vue";
import { useMultipleTab } from "store/modules/multipleTab";
import { useRouter } from 'vue-router';

const router = useRouter();
const { currentRoute } = router;

const tabsViewStore = useMultipleTab();

function showIframe(item:any) {
  return item.name === unref(currentRoute).name;
}

const framePages = computed(() => {
  const iframeSrcs = tabsViewStore.getVisitedViews.filter((el) => {
    return el.meta.iframeSrc
  });
  return iframeSrcs;
});

const isShowFrame = computed(() => {
  return Boolean(framePages.value.length);
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
import FramePage from "pages/EmbedPage/FramePage.vue";
export default defineComponent({
  name: "RenderView",
  components: {
    FramePage
  }
});
</script>