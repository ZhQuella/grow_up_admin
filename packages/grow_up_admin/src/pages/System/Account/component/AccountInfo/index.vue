<template>
  <div class="p-[20px]">
    <GDetail :model="row" label-width="100px">
      <el-row>
        <el-col :span="12">
          <GDetailItem label="账222号" prop="account" />
        </el-col>
        <el-col :span="12">
          <GDetailItem label="角色名称" prop="roleName" />
        </el-col>
        <el-col :span="12">
          <GDetailItem label="归属人" prop="belong.person" />
        </el-col>
        <el-col :span="12">
          <GDetailItem label="归属部门" prop="belong.department" />
        </el-col>
        <el-col :span="12">
          <GDetailItem label="归属岗位" prop="belong.post" />
        </el-col>
        <el-col :span="12">
          <GDetailItem label="创建方式" prop="createType" />
        </el-col>
        <el-col :span="12">
          <GDetailItem label="创建日期" prop="createDate" />
        </el-col>
      </el-row>
    </GDetail>
    <div class="flex justify-end pt-[10px]">
      <el-button @click="onClose"> 关闭 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);

const prop = defineProps({
  row: {
    type: Object,
    default: () => ({})
  }
});

const onClose = () => {
  emit("close");
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AccontInfo"
});
</script>
