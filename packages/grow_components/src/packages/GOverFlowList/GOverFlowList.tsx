
import {
  computed,
  defineComponent,
  mergeProps,
  onMounted,
  ref,
  watch,
  reactive,
  nextTick,
  getCurrentInstance
} from 'vue';
import type { VNode } from 'vue';
import { getAllElements } from '../../../types/vue-utils'
export default defineComponent({
  name: 'GOverFlowList',
  props: {
    width: {
      type: Number,
      default:0
    },
  },
  setup(props, { slots }) {
    let domWidths:number[] = reactive([]);// 记录每个子孩子的宽度
    const contentRef = ref<HTMLElement>();// 当前内容dom
    const moreRef = ref<HTMLElement>();// 展示更多dom
    const showSlotNum = ref(0);// 展示元素个数
    const overFlowNum = ref(0);// 超出宽度对应的个数
    onMounted(async () => {
      initDomProtery();
      resizeDom('onMounted');
    });
    watch(()=>props.width, (cur, pre) => {
      setTimeout(() => {
        resizeDom('props.width');
      },0)
    }, { immediate: true });

    const initDomProtery = () => {
      if(!contentRef.value) {
        return
      }
      let childs = contentRef.value.children;
      if(childs?.length) {
        for(let i in childs) {
          if (childs.hasOwnProperty(i)) {
            let element = childs[i] as HTMLElement;
            let marginR = element.style['margin-right'].replace('px','') || 0;
            let marginL = element.style['margin-left'].replace('px','') || 0;
            let offsetWidth = element.offsetWidth;
            let totalW = offsetWidth + Number(marginR) + Number(marginL);
            domWidths[i] = totalW;
          }
        }
      }
    }
    const resizeDom = (origin="") => {
      if(!contentRef.value) {
        return
      }
      let clientWidth = props.width;
      let contWidth = clientWidth - (moreRef.value?.offsetWidth ?? 0);
      let ind = 0;
      let len = domWidths.length;
      while ((contWidth > 0) && (ind < len)) {
        contWidth = contWidth - domWidths[ind];
        ;((contWidth > 0)&& (ind < len)) && ind++;
      };
      showSlotNum.value = ind > 0 ? ind : 0;
      overFlowNum.value = ind > 0 ? len - ind : len;
    }
    const overCom = () => {
      return (
        <div ref={moreRef} class='inline-block'>
          <el-tag >+{overFlowNum.value}</el-tag>
        </div>
      );
    };
    return () => {
      // 读取子dom元素个数
      let visibleChild = getAllElements(slots.default?.());
      if (visibleChild && visibleChild.length) {
        if (overFlowNum.value > 0) {
          visibleChild = visibleChild.slice(0,showSlotNum.value)
        }
      }
      return (
        <div class="tag-content flex items-center justify-start" ref={contentRef}>
            {visibleChild}
            {(overFlowNum.value > 0 )  ? overCom() : ''}
          </div>
        )
    };
  }
})