<template>
  <div>
    <div class="bg-BG_COLOR3 text-MAIN_TEXT py-[50px] px-[20px] text-[17px] mb-[10px]">
      消息示例
    </div>
    <el-card class="mx-[10px] mb-[10px]">
      <template #header>
        <div class="card-header">
          <span>Message</span>
        </div>
      </template>
      <div>
        <el-button type="info" @click="onShowMessage('')"> Info </el-button>
        <el-button type="success" @click="onShowMessage('success')"> Success </el-button>
        <el-button type="warning" @click="onShowMessage('warning')"> Warning </el-button>
        <el-button type="danger" @click="onShowMessage('error')"> Danger </el-button>
      </div>
    </el-card>
    <el-card class="mx-[10px] mb-[10px]">
      <template #header>
        <div class="card-header">
          <span>Comfirm</span>
        </div>
      </template>
      <div>
        <el-button type="primary" @click="onOpenInfoCOmfirm"> Info </el-button>
        <el-button type="primary" @click="onOpenConfirm"> Comfirm </el-button>
        <el-button type="primary" @click="onOpenSubmit"> Submit </el-button>
      </div>
    </el-card>
    <el-card class="mx-[10px] mb-[10px]">
      <template #header>
        <div class="card-header">
          <span>Notification</span>
        </div>
      </template>
      <div>
        <el-button type="info" @click="onOpenNotification('Info')"> Info </el-button>
        <el-button type="success" @click="onOpenNotification('success')"> Success </el-button>
        <el-button type="warning" @click="onOpenNotification('warning')"> Warning </el-button>
        <el-button type="danger" @click="onOpenNotification('error')"> Danger </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { Action } from "element-plus";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";

const onShowMessage = (type: any) => {
  console.log(type);
  ElMessage({
    message: "Congrats, this is a success message.",
    type
  });
};

const onOpenInfoCOmfirm = () => {
  ElMessageBox.alert("This is a message", "Title", {
    confirmButtonText: "OK",
    callback: (action: Action) => {
      ElMessage({
        type: "info",
        message: `action: ${action}`
      });
    }
  });
};
const onOpenConfirm = () => {
  ElMessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning"
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "Delete completed"
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled"
      });
    });
};

const onOpenSubmit = () => {
  ElMessageBox.prompt("Please input your e-mail", "Tip", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: "Invalid Email"
  })
    .then(({ value }) => {
      ElMessage({
        type: "success",
        message: `Your email is:${value}`
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Input canceled"
      });
    });
};

const onOpenNotification = (type: any) => {
  ElNotification({
    title: type,
    message: `This is an ${type} message`,
    type
  });
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MessagePrompt"
});
</script>
