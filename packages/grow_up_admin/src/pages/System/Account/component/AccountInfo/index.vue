<template>
  <div class="p-[20px]">
    <GDetail :model="formInfo" label-width="100px">
      <el-row>
        <el-col :span="12">
          <GDetailItem label="账号" prop="account" />
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
        <el-col :span="24">
          <GDetailItem label="角色" prop="roleNames">
            <template #default="{ value }">
              <el-tag v-for="(item,index) of (value || [])"
                      class="mr-[5px]"
                      :key="index">{{ item }}</el-tag>
            </template>
          </GDetailItem>
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
import type { AccountItem } from "../../types/index";
import { ref, onMounted } from "vue";
import axios from "api/systemMent";

const emit = defineEmits(["close"]);
const formInfo = ref({});

const accountMethod = axios.create("accountMent");

const getAcconutInfo = async (id: string) => {
  const { data } = await accountMethod.getAccountInfo({ params: { id } });
  formInfo.value = data;
};

interface propsType {
  row: AccountItem;
};

const props = withDefaults(defineProps<propsType>(), {
  row: {}
});

const onClose = () => {
  emit("close");
};

onMounted(() => {
  getAcconutInfo(props.row.id);
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AccontInfo"
});
</script>
