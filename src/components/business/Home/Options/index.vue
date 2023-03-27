<template>
  <div class="flex w-[265px] grow-0 shrink-0">
    <div class="pt-[5px]">
      <el-button
        :icon="Search"
        size="large"
        circle
        text
        class="text-[18px]"
        @click="onSearchHeadler"
      />
      <el-button
        :icon="!isFullscreen ? FullscreenOutlined : FullscreenExitOutlined"
        size="large"
        circle
        text
        class="text-[18px] ml-[5px]"
        @click="toggle"
      />
      <el-popover
        v-model="messageActive"
        trigger="click"
        width="340px"
      >
        <template #reference>
          <el-button
            :icon="Notification"
            size="large"
            circle
            text
            class="text-[18px] ml-[5px]"
          />
        </template>
        <MessageList />
      </el-popover>
      <el-button
        :icon="Settings"
        size="large"
        circle
        text
        class="text-[18px] ml-[5px]"
        @click="onSettingHadnler"
      />
      <el-button
        :icon="Help"
        size="large"
        circle
        text
        class="text-[18px] ml-[5px]"
      />
    </div>
    <div class="pt-[5px] ml-[5px]">
      <el-dropdown>
        <el-avatar
          :size="40"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <template #dropdown>
          <div class="px-[10px] pt-[5px] bg-BG_COLOR">
            <h5 class="text-TEXT_LIGHT2 text-[14px]">
              {{ userInfo.userName }}
            </h5>
            <p class="text-TEXT_LIGHT2 text-[12px]">
              {{ userInfo.dept }}
            </p>
          </div>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, index) of options"
              :key="index"
            >
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.label }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Settings, Help, Notification, Search } from "@vicons/carbon";
import { FullscreenExitOutlined, FullscreenOutlined } from "@vicons/antd";
import MessageList from "components/business/Home/MessageList/index.vue";
import { useEvent } from "./use/useEvent";
import { useI18n } from "vue-i18n";
import { getImageUrl } from "util/System";
import { useSystemStore } from "store/modules/systemInfo";

const i18n = useI18n();
const systemStore = useSystemStore();

const userInfo = computed(() => {
  return systemStore.getUserInfo;
});

const {
  settingActive,
  isFullscreen,
  toggle,
  onSettingHadnler,
  onSearchHeadler,
  messageActive,
} = useEvent();

const options = computed(() => {
  return [
    {
      label: i18n.t("APP_SEARCH.USER_DATA"),
      key: "profile",
      icon: "User",
    },
    {
      label: i18n.t("APP_SEARCH.LOG_OUT"),
      key: "logout",
      icon: "Logout",
    },
  ];
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "OptionsComponent",
});
</script>
