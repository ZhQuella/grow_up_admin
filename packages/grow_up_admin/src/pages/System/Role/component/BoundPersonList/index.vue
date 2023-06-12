<template>
  <div>
    <el-alert title="解绑所有人员将失去对应角色权限" type="warning" show-icon :closable="false"/>
    <div class="p-[20px]">
      <el-from>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item>
              <el-select class="w-full" placeholder="请选择人员"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-select class="w-full" placeholder="请选择部门"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" icon="Search">查询</el-button>
            <el-button icon="ZoomReset">重置</el-button>
          </el-col>
        </el-row>
      </el-from>
      <PerfectTable height="300px"
                    ref="tableRef"
                    :columns="tableColumns"
                    :data="personList"
                    only-key="id"
                    @select="onTableSelect">
        <template #btnOption="btnOption">
          <ButtonGroup :button-group="buttonGroup" :max="4" :data="btnOption" />
        </template>
      </PerfectTable>
    </div>
    <div class="flex justify-end px-[10px] pb-[10px]">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary"
                 :disabled="!personSelects.length"
                 @click="onUntieSelects"> 解绑 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RoleItem } from "../../types/index";
import { toRef, onMounted, computed } from "vue";
import PerfectTable from "components/public/PerfectTable/index.vue";
import { useTable } from "./use/useTable";
import ButtonGroup from "components/public/ButtonGroup/index.vue";

interface Props {
  data: RoleItem
};

const props = withDefaults(defineProps<Props>(), {
  data: {}
});

const row = toRef(props.data);

const roleId = computed(() => {
  return row.value.id;
});

const emit = defineEmits(["close"]);

const {
  personList,
  tableColumns,
  buttonGroup,
  getRoleBoundPersonList,
  onTableSelect,
  tableRef,
  personSelects,
  onUntieSelects
} = useTable({
  roleId,
  emit
});

defineOptions({ name: "BoundPersonList" });

const onClose = () => {
  emit("close");
};

onMounted(async () => {
  await getRoleBoundPersonList(row.value.id);
});
</script>
