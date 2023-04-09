// import { MockMethod } from "vite-plugin-mock";
const roleSings = [
  "admin",
  "minor"
];

const menuList = [
  {
    label: "Dashboard",
    name: "dashboard",
    icon: "AreaCustom",
    children: [
      {
        label: "数据报表",
        name: "dataReport",
        icon: "ChartCombo",
        path: "dataReport",
        component: "Dashboard/dataReport/index.vue",
      },
    ],
  },
  {
    label: "功能",
    name: "Feat",
    icon: "Function",
    children:[
      {
        label: "引导",
        name: "boot",
        icon: "CloudLogging",
        path: "guidance",
        component: "Feat/guidance/index.vue",
      },
      {
        label: "标签操作",
        name: "OpenSubpage",
        icon: "PageBreak",
        path: "OpenSubpage",
        component: "Feat/OpenSubpage/index.vue",
      },
      {
        label: "本地下载Excel",
        name: "DownExcel",
        icon: "Download",
        path: "DownExcel",
        component: "Feat/DownExcel/index.vue",
      },
      {
        label: "消息示例",
        name: "MessagePrompt",
        icon: "Notification",
        path: "MessagePrompt",
        component: "Feat/MessagePrompt/index.vue",
      },
      {
        label: "数字动画",
        name: "CountTo",
        icon: "NumberOutlined",
        path: "CountTo",
        component: "Feat/CountTo/index.vue",
      }
    ]
  },
  {
    label: "自定义组件名称",
    name: "customPage",
    icon: "Concept",
    children: [
      {
        label: "自定义1",
        name: "customPage1",
        icon: "Development",
        path: "customPage1",
        component: "Custom/customPage1/index.vue",
        custom: true,
      },
      {
        label: "自定义2",
        name: "customPage2",
        icon: "Development",
        path: "customPage2",
        component: "Custom/customPage2/index.vue",
        custom: true,
        children: [
          {
            label: "自定义2-1",
            name: "customPage1-1",
            icon: "Development",
            path: "customPage1-1",
            component: "Custom/customPage1/index.vue",
            custom: true,
          },
          {
            label: "自定义2-2",
            name: "customPage2-2",
            icon: "Development",
            path: "customPage2-2",
            component: "Custom/customPage2/index.vue",
            custom: true,
          },
        ],
      },
    ],
  },
  {
    label: "系统管理",
    name: "SystemManagement",
    icon: "ShopOutlined",
    children: [{
      label: "账号管理",
      name: "AccountManagement",
      icon: "GroupAccount",
      path: "account-management",
      component: "System/Account/index.vue"
    }]
  }
];

export default [{
  url: "/menu/list",
  method: "get",
  response: () => { 
    return {
      code: 10000,
      message: "成功",
      result: {
        menuList
      }
    }
  }
},
{
  url: "/user/authority/signs",
  method: "get",
  response: () => { 
    return {
      code: 10000,
      message: "成功",
      result: {
        roleSings
      }
    }
  }
}];
