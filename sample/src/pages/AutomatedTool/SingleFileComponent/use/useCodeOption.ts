import { reactive } from "vue";
import * as vue from "vue";
import * as ELEMENT from "element-plus";

export const useCodeOption = () => {
  let options = reactive({
    files: {
      "App.vue":
        '<template>\n  <CeShi /> \n  <h1 class="title">测试</h1>\n</template>\n\n<script setup>\nimport CeShi from "./CeShi.vue";\nimport { ref } from "vue";\n\nconst num = ref(0);\n  \nconst onClick = () => {\n  console.log("click Me!!!");\n  num.value += 1;\n};\n</script>\n\n<style scoped>\n.title {\n  color: green;\n}\n</style>',
      "CeShi.vue":
        '<template>\n\t<p class="pre">测试内容</p>\n</template>\n\n<script setup>\n\n</script>\n\n<style>\n.pre {\n  color: pink;\n}\n</style>',
      "CeShi1.vue": "",
      "CeShi2.vue": "",
      "CeShi3.vue": "",
      "CeShi4.vue": "",
      "CeShi5.vue": "",
      "CeShi6.vue": "",
      "CeShi7.vue": "",
      "CeShi8.vue": ""
    },
    imports: {
      vue: vue,
      "element-plus": ELEMENT
    }
  });

  return {
    options
  };
};
