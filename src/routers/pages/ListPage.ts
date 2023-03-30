export default [
  {
    label: "列表页面",
    name: "ListPage",
    icon: "UnorderedListOutlined",
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
      }
    ],
  },
];
