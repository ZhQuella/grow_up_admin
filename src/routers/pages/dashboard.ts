
export default [{
  label: "Dashboard",
  name: "dashboard",
  icon: "AreaCustom",
  children: [{
    label: "分析页面",
    name: "analysis",
    icon: "Bot",
    path: "analysis",
    component: "Dashboard/analysis/index.vue"
  },
  {
    label: "工作台",
    name: "workbench",
    icon: "Carbon3DMprToggle",
    path: "workbench",
    component: "Dashboard/workbench/index.vue",
    hidden: true,
    default: true
  }]
}];
