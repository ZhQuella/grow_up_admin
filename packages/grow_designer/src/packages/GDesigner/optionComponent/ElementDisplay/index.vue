<template>
  <div class="px-[10px] py-[5px]">
    <span class="text-[12px] leading-[24px]">布局模式</span>
    <el-radio-group class="ele-display-container "
                    v-model="value"
                    size="small">
      <el-radio-button label="inline" value="inline">
        <el-tooltip content="内部布局 inline"
                    placement="top">
          <el-icon size="14">
            <NameSpace />
          </el-icon>
        </el-tooltip>
      </el-radio-button>
      <el-radio-button label="flex" value="flex">
        <el-tooltip content="弹性布局 flex"
                    placement="top">
          <el-icon size="14" >
            <ShowDataCards />
          </el-icon>
        </el-tooltip>
      </el-radio-button>
      <el-radio-button label="block" value="block" >
        <el-tooltip content="块级布局 block"
                    placement="top">
          <el-icon size="14" >
            <GroupResource />
          </el-icon>
        </el-tooltip>
      </el-radio-button>
      <el-radio-button label="inline-block" value="inline-block" >
        <el-tooltip content="内联块布局 inline-block"
                    placement="top">
          <el-icon size="14" >
            <Thumbnail2 />
          </el-icon>
        </el-tooltip>
      </el-radio-button>
    </el-radio-group>

    <template v-if="value === 'flex'">
      <span class="text-[12px] leading-[24px]">主轴方向</span>
      <el-radio-group class="ele-display-container"
                      size="small">
        <el-radio-button label="inline" value="inline">
          <el-tooltip content="水平方向，起点在左侧"
                      placement="top">
            <el-icon size="14">
              <OpenPanelFilledLeft />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="flex" value="flex">
          <el-tooltip content="水平方向，起点在右侧"
                      placement="top">
            <el-icon size="14" >
              <OpenPanelFilledRight />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="block" value="block" >
          <el-tooltip content="垂直方向，起点在上方"
                      placement="top">
            <el-icon size="14" >
              <OpenPanelFilledTop />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="inline-block" value="inline-block" >
          <el-tooltip content="垂直方向，起点在下方"
                      placement="top">
            <el-icon size="14" >
              <OpenPanelFilledBottom />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
      </el-radio-group>

      <span class="text-[12px] leading-[24px]">主轴对齐</span>
      <el-radio-group class="ele-display-container"
                      size="small">
        <el-radio-button label="inline" value="inline">
          <el-tooltip content="左对齐"
                      placement="top">
            <el-icon size="14">
              <AlignHorizontalLeft />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="flex" value="flex">
          <el-tooltip content="右对齐"
                      placement="top">
            <el-icon size="14" >
              <AlignHorizontalRight />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="block" value="block" >
          <el-tooltip content="水平居中"
                      placement="top">
            <el-icon size="14" >
              <AlignHorizontalCenter />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="inline-block" value="inline-block" >
          <el-tooltip content="两端对齐"
                      placement="top">
            <el-icon size="14" >
              <PanHorizontal />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="inline-block" value="inline-block" >
          <el-tooltip content="横向平分"
                      placement="top">
            <el-icon size="14" >
              <Pause />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
      </el-radio-group>

      <span class="text-[12px] leading-[24px]">辅轴方向</span>
      <el-radio-group class="ele-display-container"
                      size="small">
        <el-radio-button label="inline" value="inline">
          <el-tooltip content="起点对齐"
                      placement="top">
            <el-icon size="14">
              <AlignVerticalTop />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="flex" value="flex">
          <el-tooltip content="终点对齐"
                      placement="top">
            <el-icon size="14" >
              <AlignVerticalBottom />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="block" value="block" >
          <el-tooltip content="水平居中"
                      placement="top">
            <el-icon size="14" >
              <AlignVerticalCenter/>
            </el-icon>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="inline-block" value="inline-block" >
          <el-tooltip content="项目第一行文字基线对齐"
                      placement="top">
            <el-icon size="14" >
              <TextUnderline />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="inline-block" value="inline-block" >
          <el-tooltip content="占满整个容器的高度"
                      placement="top">
            <el-icon size="14" >
              <JoinRight />
            </el-icon>
          </el-tooltip>
        </el-radio-button>
      </el-radio-group>

      <span class="text-[12px] leading-[24px]">换行</span>
      <el-radio-group class="ele-display-container"
                      size="small">
        <el-radio-button label="" value="">
          <el-tooltip content="不换行"
                      placement="top">
            <span class="text-[14px]">不换行</span>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="" value="">
          <el-tooltip content="正换行"
                      placement="top">
            <span class="text-[14px]">正换行</span>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="" value="">
          <el-tooltip content="逆换行"
                      placement="top">
            <span class="text-[14px]">逆换行</span>
          </el-tooltip>
        </el-radio-button>
      </el-radio-group>
    </template>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "ElementDisplay" });
import {
  GroupResource,
  NameSpace,
  ShowDataCards,
  Thumbnail2,
  OpenPanelFilledLeft,
  OpenPanelFilledRight,
  OpenPanelFilledTop,
  OpenPanelFilledBottom,
  AlignHorizontalLeft,
  AlignHorizontalRight,
  AlignHorizontalCenter,
  PanHorizontal,
  Pause,
  AlignVerticalTop,
  AlignVerticalBottom,
  AlignVerticalCenter,
  TextUnderline,
  JoinRight
} from "@vicons/carbon";
import { ref } from "vue";
const value = ref("inline");

</script>

<style lang="scss">
.ele-display-container {
  display: flex;
  .el-radio-button {
    display: block;
    flex: 1;
  }
  .el-radio-button__inner {
    display: block;
    width: 100%;
  }
}
</style>
