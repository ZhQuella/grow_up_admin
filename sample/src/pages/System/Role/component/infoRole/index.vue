<template>
  <PageLayout>
    <template #main="{ height }">
      <el-scrollbar :height="height">
        <div class="px-[20px]">
          <div class="pb-[10px]">
            <h5 class="text-[15px] font-bold py-[5px]">基础信息</h5>
            <GDetail :model="roleInfo">
              <el-row :gutter="20">
                <el-col :span="8">
                  <GDetailItem label="角色名称" prop="roleName"></GDetailItem>
                </el-col>
                <el-col :span="8">
                  <GDetailItem label="角色编码" prop="roleCode"></GDetailItem>
                </el-col>
                <el-col :span="8">
                  <GDetailItem label="角色类型" prop="roleType">
                    <template #default="{ value }">
                      <el-tag :type="['', 'warning'][value]">{{
                        (roleTypes.find((el) => el.code === value) || {}).label
                      }}</el-tag>
                    </template>
                  </GDetailItem>
                </el-col>
                <el-col :span="8">
                  <GDetailItem label="权限字符" prop="authorityChart"></GDetailItem>
                </el-col>
                <el-col :span="8">
                  <GDetailItem label="启用状态" prop="state">
                    <template #default="{ value }">
                      <el-tag :type="['danger', 'success'][value]">{{
                        (roleStates.find((el) => el.code === value) || {}).label
                      }}</el-tag>
                    </template>
                  </GDetailItem>
                </el-col>
                <el-col :span="8">
                  <GDetailItem label="创建时间" prop="createTime"></GDetailItem>
                </el-col>
                <el-col :span="8">
                  <GDetailItem label="更新时间" prop="updataTime"></GDetailItem>
                </el-col>
                <el-col :span="24">
                  <GDetailItem label="角色描述" prop="roleMark"></GDetailItem>
                </el-col>
              </el-row>
            </GDetail>
          </div>
          <div class="pb-[10px]">
            <h5 class="text-[15px] font-bold py-[5px]">权限信息</h5>
            <el-tabs tab-position="top" v-model="authorityTabsValue">
              <el-tab-pane name="FunctionalAuthority" label="功能权限">
                <FunctionalAuthority />
              </el-tab-pane>
              <el-tab-pane name="DataPermission" label="数据权限">
                <DataPermission />
              </el-tab-pane>
            </el-tabs>
          </div>

          <div class="pb-[10px]">
            <h5 class="text-[15px] font-bold py-[5px]">使用信息</h5>
            <PerfectTable height="350px" :columns="tableColumns" :data="personList" onlyIndex />
          </div>
        </div>
      </el-scrollbar>
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import type { RolePersonItem } from "../../types/index";
import { toRefs, onMounted } from "vue";
import PerfectTable from "components/public/PerfectTable/index.vue";
import FunctionalAuthority from "./FunctionalAuthority.vue";
import DataPermission from "./DataPermission.vue";
import { useDict } from "../../use/useDict";
import { useBasic } from "./use/useBasic";
import { useApply } from "./use/useApply";
import { useAuthority } from "./use/useAuthority";

interface Props {
  data: RolePersonItem;
}

const { roleStates, roleTypes } = useDict();

const props = withDefaults(defineProps<Props>(), {
  data: () => ({})
});

const { data } = toRefs(props);

const { roleInfo, getRoleInfo } = useBasic();

const { tableColumns, personList, getRoleBoundPersonList } = useApply();

const { authorityTabsValue } = useAuthority();

onMounted(() => {
  getRoleInfo(data.value?.id);
  getRoleBoundPersonList(data.value?.id);
});
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "infoRole"
});
</script>
