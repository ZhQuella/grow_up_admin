<template>
  <div>
    <div class="p-[10px]">
      <ElForm @submit.native.prevent
              :model="formNameMode"
              ref="ruleFormRef">
        <ElFormItem prop="fileName"
                    :rules="[
                      { required: true, message: '请输入文件名称', trigger: 'blur' },
                      { min: 5, max: 30, message: '长度应该是5到30之间', trigger: 'blur' }
                    ]">
          <ElInput v-model="formNameMode.fileName"
                   placeholder="请输入文件名称">
            <template #suffix>.vue</template>
          </ElInput>
        </ElFormItem>
      </ElForm>
    </div>
    <div class="p-[10px] pt-[5px] flex justify-center">
      <ElButton @click="emits('close')">取消</ElButton>
      <ElButton type="primary" @click="onSubmit">添加</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const ruleFormRef = ref();
const formNameMode = reactive({
  fileName: ""
});

const emits = defineEmits(['submit','close'])

const onSubmit = async () => {
  try {
    await ruleFormRef.value.validate();
    emits('submit', { fileName: `${formNameMode.fileName}.vue` });
  } catch {}
};
</script>

<style lang="scss" scoped>

</style>