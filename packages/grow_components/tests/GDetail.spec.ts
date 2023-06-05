import type { Ref } from "vue";
import { GDetail, GDetailItem } from "@/packages/GDetail";
import { describe, expect, it } from 'vitest';
import { reactive, ref } from "vue";
import { mount } from '@vue/test-utils';

interface mockData {
  name: string;
};

describe('GDetail 功能测试', () => {

  let model: Ref<mockData> = ref({
    name: "张三"
  });
  let label: string = "姓名";
  let prop: string = "name";

  it("render provide/inject", () => {
    const wrapper = mount(GDetailItem, {
      global: {
        provide: {
          "g-detail": reactive({
            model,
            align: "left",
            labelWidth: "100px"
          })
        },
      },
      props: {
        label,
        prop,
        align: "left",
        labelWidth: "100px"
      }
    });
    console.log(wrapper.find(".g-detail-label").attributes().hasOwnProperty("text-align"))
    expect(label).toBe(wrapper.find(".g-detail-label").text());
    expect(model.value[prop]).toBe(wrapper.find(".g-detail-value").text());
  });

  it("render slots", () => {
    const wrapper = mount(GDetailItem, {
      global: {
        provide: {
          "g-detail": reactive({
            model,
            align: "left",
            labelWidth: "100px"
          })
        },
      },
      slots: {
        default: (item) => `<b>${item.value}</b>`
      },
      props: {
        label,
        prop,
        align: "left",
        labelWidth: "100px"
      }
    });
    expect(`<b>${model.value[prop]}</b>`).toBe(wrapper.find(".w-full").text())
  });

});
