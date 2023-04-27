export default [
  {
    label: "外部页面",
    name: "ExternalPage",
    icon: "UvIndexAlt",
    children: [
      {
        label: "组件文档(内嵌)",
        name: "elementPlusDoc",
        icon: "RadioCombat",
        path: "element-plus-doc",
        component: "EmbedPage/index.vue",
        iframeSrc: "https://element-plus.gitee.io/zh-CN/"
      },
      {
        label: "组件文档(外链)",
        name: "ComponentDocument",
        icon: "ComposerEdit",
        path: "https://element-plus.gitee.io/zh-CN/",
        component: "EmbedPage/index.vue"
      }
    ]
  }
];
