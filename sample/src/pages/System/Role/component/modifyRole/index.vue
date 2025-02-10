<template>
  <div class="p-[20px]">
    <el-form ref="formRef" :model="formData" size="mini" :rules="rules" label-width="100px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input placeholder="请输入角色名称" v-model="formData.roleName" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="roleCode">
        <el-input placeholder="请输入角色编码" v-model="formData.roleCode" clearable></el-input>
      </el-form-item>
      <el-form-item label="权限字符" prop="authorityChart">
        <el-input
          placeholder="请输入权限字符"
          v-model="formData.authorityChart"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="角色类型" prop="roleType">
        <el-select placeholder="请选择角色类型" class="w-full" v-model="formData.roleType">
          <el-option
            v-for="(item, index) of roleTypes"
            :label="item.label"
            :value="item.code"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启用状态" prop="state">
        <el-select class="w-full" placeholder="请选择启用状态" v-model="formData.state">
          <el-option
            v-for="(item, index) of roleStates"
            :label="item.label"
            :value="item.code"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleMark">
        <el-input
          type="textarea"
          resize="none"
          rows="3"
          maxlength="120"
          show-word-limit
          placeholder="请输入角色描述"
          v-model="formData.roleMark"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="flex justify-end pt-[10px]">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onModifyRole" :loading="buttonLoading">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RoleItem } from "../../types/index";
import { onMounted } from "vue";
import { useForm } from "./use/useForm";
import { useDict } from "../../use/useDict";

interface Props {
  data: RoleItem;
}

const emit = defineEmits(["success", "close"]);
const { roleStates, roleTypes } = useDict();

const props = withDefaults(defineProps<Props>(), {
  data: {}
});

const { getRoleInfo, formData, rules, formRef, onModifyRole, buttonLoading } = useForm({
  emit
});

const onClose = () => {
  emit("close");
};

onMounted(() => {
  getRoleInfo(props.data.id);
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "modifyRole"
});
</script>
