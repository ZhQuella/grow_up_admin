<template>
  <div />
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { unref } from "vue";
import { useRouter } from "vue-router";

const { currentRoute, replace } = useRouter();

const { params, query } = unref(currentRoute);
const { path, _redirect_type = "path" } = params;

replace({
  path,
  query,
  params
} as RouteLocationRaw);
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RedirectPage"
});
</script>
