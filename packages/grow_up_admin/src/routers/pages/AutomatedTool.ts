export default [
  {
    label: "自动化工具",
    name: "AutomatedTool",
    icon: "Calibrate",
    children: [
      {
        label: "页面设计器",
        name: "PageDesigner",
        icon: "Departure",
        path: "page-designer",
        component: "AutomatedTool/PageDesigner/index.vue",
      },
      {
        label: "流程引擎",
        name: "ProcessEngine",
        icon: "FlowModeler",
        path: "process-engine",
        component: "AutomatedTool/ProcessEngine/index.vue",
      },
    ],
  },
];
