<template>
  <template v-if="!isSocket">
    <component :is="config.elTagName">

    </component>
  </template>

  <template v-if="isSocket">
    <template v-if="config.elTagName === 'el-card'">
      <el-card>
        <template #header>
          <el-row>
            <el-col :span="12">
              <span>Card name</span>
            </el-col>
            <el-col :span="12">

            </el-col>
          </el-row>
        </template>
        <div>
<!--          <DraggableContent />-->
        </div>
      </el-card>
    </template>

    <template v-if="config.elTagName === 'el-tabs'">
      <el-tabs type="border-card">
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </template>

    <template v-if="config.elTagName === 'el-row'">
      <el-row>
        <el-col>12312</el-col>
      </el-row>
    </template>

  </template>
</template>

<script setup lang="ts">
import { computed, toRefs, ref } from "vue";
import DraggableContent from "../../../draggableContent/index.vue";
import abstractionComponent from "../../../abstractionComponent/index.vue";

const list = ref([]);

interface PropsType {
  config: any;
}

const props = withDefaults(defineProps<PropsType>(), {
  config: () => ({})
});

const { config } = toRefs(props);

const isSocket = computed(() => {
  const slotMap = ["el-card", "el-tabs", "el-row"];
  return slotMap.includes(config.value.elTagName);
});

</script>
