import { reactive } from "vue";
import * as ELEMENT from "element-plus";
import * as vue from "vue";

export const useSfcOption = () => {
    let options = reactive({
        files: {
            "App.vue": "<template>\n  <CeShi /> \n  <ElButton @click=\"onClick\">Num Add = {{ num }}</ElButton>\n</template>\n\n\<script setup\>\nimport CeShi from \"./CeShi.vue\";\nimport { ref } from \"vue\";\nimport { ElButton } from \"element-plus\";\n\nconst num = ref(0);\n  \nconst onClick = () => {\n  console.log(\"click Me!!!\");\n  num.value += 1;\n};\n</script>\n\n<style>\n\n</style>",
            "CeShi.vue": "<template>\n\t<p class=\"per\">测试内容</p>\n</template>\n\n<script setup>\n\n</script>\n\n<style>\n.per {\n  color: pink;\n}\n</style>"
        },
        imports: {
            "vue": vue,
            "element-plus": ELEMENT
        }
    });

    return {
        options
    }
}
