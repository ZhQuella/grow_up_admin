
<script lang="tsx">
import { defineComponent, unref, reactive, watch, toRefs } from "vue";
import { ElTableColumn } from "element-plus";
import { deepCopy } from "util/index";

export default defineComponent({
  name: "Column",
  props: {
    children: {
      type: Array,
      default: ():any[] => []
    }
  },
  setup(props) { 

    const { children } = toRefs(props);

    const state = reactive({
      columns: []
    });
    
    watch(() => children, (newValue) => {
      state.columns = deepCopy(newValue);
    }, {
      immediate: true,
      deep: true
    });
    
    const renderColumnsFn = (renderColumns: any) => { 
      return renderColumns.map((item: any) => { 
        return (
          <>
            {item.visible !== false ? <ElTableColumn prop={item.field}
                                                    { ...item }
                                                    label={item.title}
                                                    key={item.field}
                                                    fixed={item.fixed}
                                                    width={item.width}>
              { item.children && renderColumnsFn(item.children) }
            </ElTableColumn>: null }
          </>
        )
      })
    };

    return () => (
      <>
        { renderColumnsFn(unref(children)) }
      </>
    )
  }
});
</script>
