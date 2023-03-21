export default [
  {
    label: "列表页面",
    name: "ListPage",
    icon: "UnorderedListOutlined",
    children: [
      {
        label: "Element列表",
        name: "ElementListPage",
        icon: "ChartTreemap",
        children: [
          {
            label: "普通列表",
            name: "ElBaseList",
            icon: "ListNumbered",
            path: "el-base-list",
            component: "ListPage/ElBaseList/index.vue",
          },
          {
            label: "虚拟列表",
            name: "ElVirtualList",
            icon: "ListDropdown",
            path: "el-virtual-list",
            component: "ListPage/ElVirtualList/index.vue",
          },
        ],
      },
      {
        label: "其他虚拟列表",
        name: "VxeVirtualList",
        icon: "VirtualColumnKey",
        path: "vuex-virtual-list",
        component: "ListPage/VxeVirtualList/index.vue",
      },
    ],
  },
];
