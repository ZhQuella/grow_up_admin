<template>
  <div>
    <div
      class="bg-BG_COLOR3 text-MAIN_TEXT py-[50px] px-[20px] text-[17px] mb-[10px]"
    >
      标签页操作示例
    </div>
    <div class="mx-[10px] mb-[10px]">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>标签操作</span>
          </div>
        </template>
        <div>
          <el-button @click="closeAll">
            关闭所有
          </el-button>
          <el-button @click="closeLeft">
            关闭左侧
          </el-button>
          <el-button @click="closeRight">
            关闭右侧
          </el-button>
          <el-button @click="closeOther">
            关闭其他
          </el-button>
          <el-button @click="closeCurrent">
            关闭当前
          </el-button>
          <el-button @click="reloadCurrent">
            刷新当前
          </el-button>
        </div>
      </el-card>
    </div>
    <div class="mx-[10px]">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>打开子页面</span>
          </div>
        </template>
        <div>
          <el-button @click="onOpenPage(1)">
            打开子页面1
          </el-button>
          <el-button @click="onOpenPage(2)">
            打开子页面2
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useTabs } from "hooks/usetabs/index";

const router = useRouter();

const {
  closeAll,
  closeLeft,
  closeRight,
  closeOther,
  closeCurrent,
  reloadCurrent,
} = useTabs();

const onOpenPage = (id: number) => {
  router.push({
    name: "Child",
    params: {
      id,
    },
  });
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "OpenSubpage",
});
</script>
