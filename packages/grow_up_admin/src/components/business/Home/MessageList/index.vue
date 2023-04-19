<template>
  <el-tabs
    v-model="tabActive"
    type="card"
    class="message-tabs-wrap"
  >
    <el-tab-pane name="notice">
      <template #label>
        <el-badge
          is-dot
          class="item"
        >
          <p class="h-[24px] leading-[24px] translate-y-[-1px]">
            通知(10)
          </p>
        </el-badge>
      </template>
      <el-scrollbar class="h-[400px]">
        <div
          v-for="(item, index) of 10"
          :key="item"
        >
          <div class="flex px-[10px] py-[5px]">
            <div class="pt-[10px] w-[50px] grow-0 shrink-0">
              <el-avatar
                round
                :size="50"
                src="https://hbimg.huabanimg.com/d3b204e9ee6a9ff4d26e38d878dcbb450e9a0cef456b-NDcu2v_fw658"
              />
            </div>
            <div class="pl-[10px]">
              <p
                class="text-[15px] max-w-[160px] text-MAIN_TEXT font-bold leading-[32px] pt-[5px]"
              >
                你收到了 14 份新周报
              </p>
              <p
                class="max-w-[160px] text-TEXT_LIGHT2 leading-[24px] text-[12px]"
              >
                2017-08-09
              </p>
            </div>
          </div>
          <el-divider
            v-if="index !== 9"
            class="my-[5px]"
          />
        </div>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane name="message">
      <template #label>
        <el-badge
          is-dot
          class="item"
        >
          <p class="h-[24px] leading-[24px] translate-y-[-1px]">
            消息(5)
          </p>
        </el-badge>
      </template>
      <el-scrollbar class="h-[400px]">
        <div
          v-for="(item, index) of 5"
          :key="item"
        >
          <div class="flex px-[10px] py-[5px]">
            <div
              class="pt-[10px] w-[60px] grow-0 shrink-0 flex justify-center items-center"
            >
              <el-avatar
                round
                :size="60"
                src="https://img1.baidu.com/it/u=475223453,1499318995&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
              />
            </div>
            <div class="pl-[10px]">
              <p
                class="text-[15px] max-w-[160px] text-MAIN_TEXT font-bold leading-[32px]"
              >
                曲丽丽 评论了你
              </p>
              <p
                class="text-gray-500 text-[12px] n-ellipsis n-ellipsis--line-clamp"
                style="
                  text-overflow: ellipsis;
                  line-clamp: 2;
                  overflow: hidden;
                  box-orient: vertical;
                  display: -webkit-box;
                "
              >
                描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息
              </p>
              <p
                class="max-w-[160px] text-TEXT_LIGHT2 leading-[24px] text-[12px]"
              >
                2017-08-09
              </p>
            </div>
          </div>
          <el-divider
            v-if="index !== 4"
            class="my-[5px]"
          />
        </div>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane name="toBeDone">
      <template #label>
        <el-badge
          is-dot
          class="item"
        >
          <p class="h-[24px] leading-[24px] translate-y-[-1px]">
            待办(5)
          </p>
        </el-badge>
      </template>
      <el-scrollbar class="h-[400px]">
        <div
          v-for="(item, index) of 5"
          :key="item"
        >
          <div class="px-[10px] py-[5px]">
            <h5 class="text-[15px]">
              任务名称
            </h5>
            <div class="py-[5px]">
              <el-tag>派送任务</el-tag>
            </div>
            <p
              class="text-gray-500 text-[12px] n-ellipsis n-ellipsis--line-clamp"
              style="
                text-overflow: ellipsis;
                line-clamp: 2;
                overflow: hidden;
                box-orient: vertical;
                display: -webkit-box;
              "
            >
              冠霖 需在 2017-01-07 前完成代码变更任务 冠霖 需在 2017-02-01
              前完成代码变更任务 冠霖 需在 2017-04-05 前完成代码变更任务
            </p>
          </div>
          <el-divider
            v-if="index !== 4"
            class="my-[5px]"
          />
        </div>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";

const tabActive = ref("notice");
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MessageList",
});
</script>
