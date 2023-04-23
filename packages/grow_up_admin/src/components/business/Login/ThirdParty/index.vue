<template>
  <div class="flex justify-between">
    <el-icon
      size="24px"
      class="cursor-pointer text-TEXT_LIGHT2 hover:text-PUBLIC_MAIN_COLOR enter-y"
    >
      <AlipayCircleOutlined />
    </el-icon>
    <el-icon
      size="24px"
      class="cursor-pointer text-TEXT_LIGHT2 hover:text-PUBLIC_MAIN_COLOR enter-y"
    >
      <GithubOutlined />
    </el-icon>
    <el-icon
      size="24px"
      class="cursor-pointer text-TEXT_LIGHT2 hover:text-PUBLIC_MAIN_COLOR enter-y"
    >
      <WechatFilled />
    </el-icon>
    <el-icon
      size="24px"
      class="cursor-pointer text-TEXT_LIGHT2 hover:text-PUBLIC_MAIN_COLOR enter-y"
    >
      <WeiboOutlined />
    </el-icon>
    <el-icon
      size="24px"
      class="cursor-pointer text-TEXT_LIGHT2 hover:text-PUBLIC_MAIN_COLOR enter-y"
    >
      <GoogleOutlined />
    </el-icon>
    <el-icon
      size="24px"
      class="cursor-pointer text-TEXT_LIGHT2 hover:text-PUBLIC_MAIN_COLOR enter-y"
    >
      <GithubFilled />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import {
  AlipayCircleOutlined,
  GithubOutlined,
  WechatFilled,
  WeiboOutlined,
  GoogleOutlined,
  GithubFilled
} from "@vicons/antd";
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ThirdParty"
});
</script>
