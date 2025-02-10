// import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

const roleSings = ["admin", "minor"];

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
        component: "Dashboard/dataReport/index.vue"
      }
    ]
  },
  {
    label: "功能",
    name: "Feat",
    icon: "Function",
    children: [
      {
        label: "引导",
        name: "boot",
        icon: "CloudLogging",
        path: "guidance",
        component: "Feat/guidance/index.vue"
      },
      {
        label: "标签操作",
        name: "OpenSubpage",
        icon: "PageBreak",
        path: "OpenSubpage",
        component: "Feat/OpenSubpage/index.vue"
      },
      {
        label: "本地下载Excel",
        name: "DownExcel",
        icon: "Download",
        path: "DownExcel",
        component: "Feat/DownExcel/index.vue"
      },
      {
        label: "消息示例",
        name: "MessagePrompt",
        icon: "Notification",
        path: "MessagePrompt",
        component: "Feat/MessagePrompt/index.vue"
      },
      {
        label: "数字动画",
        name: "CountToExample",
        icon: "NumberOutlined",
        path: "CountToExample",
        component: "Feat/CountToExample/index.vue"
      },
      {
        label: "分屏展示",
        name: "SplitPaneTest",
        icon: "PanelExpansion",
        path: "SplitPaneTest",
        component: "Feat/SplitPaneTest/index.vue"
      },
      {
        label: "折叠列表",
        name: "OverflowList",
        icon: "FolderDetailsReference",
        path: "OverflowList",
        component: "Feat/OverflowList/index.vue"
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
        custom: true
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
            label: "自定义2-11",
            name: "customPage1-1",
            icon: "Development",
            path: "customPage1-1",
            component: "Custom/customPage1/index.vue",
            custom: true
          },
          {
            label: "自定义2-22",
            name: "customPage2-2",
            icon: "Development",
            path: "customPage2-2",
            component: "Custom/customPage2/index.vue",
            custom: true
          }
        ]
      }
    ]
  },
  {
    label: "系统管理",
    name: "SystemManagement",
    icon: "ShopOutlined",
    children: [
      {
        label: "账号管理",
        name: "AccountManagement",
        icon: "GroupAccount",
        path: "account-management",
        component: "System/Account/index.vue"
      },
      {
        label: "角色管理",
        name: "RoleManagement",
        icon: "Events",
        path: "role-management",
        component: "System/Role/index.vue"
      },
      {
        label: "菜单管理",
        name: "MenuManagement",
        icon: "Menu",
        path: "menu-management",
        component: "System/Menu/index.vue"
      }
    ]
  }
];

const menuDataList: any[] = [
  {
    sort: 1,
    label: "Dashboard",
    name: "dashboard",
    icon: "AreaCustom",
    menuType: "0",
    hidden: true,
    state: "1",
    createTime: Mock.mock("@now()"),
    children: [
      {
        sort: 1,
        menuType: "1",
        label: "数据报表",
        name: "dataReport",
        icon: "ChartCombo",
        path: "dataReport",
        component: "Dashboard/dataReport/index.vue",
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()")
      }
    ]
  },
  {
    label: "功能",
    name: "Feat",
    icon: "Function",
    menuType: "0",
    sort: 2,
    hidden: true,
    state: "1",
    createTime: Mock.mock("@now()"),
    children: [
      {
        sort: 1,
        menuType: "1",
        label: "引导",
        name: "boot",
        icon: "CloudLogging",
        path: "guidance",
        component: "Feat/guidance/index.vue",
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()")
      },
      {
        sort: 2,
        menuType: "1",
        label: "标签操作",
        name: "OpenSubpage",
        icon: "PageBreak",
        path: "OpenSubpage",
        component: "Feat/OpenSubpage/index.vue",
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()")
      },
      {
        sort: 3,
        menuType: "1",
        label: "本地下载Excel",
        name: "DownExcel",
        icon: "Download",
        path: "DownExcel",
        component: "Feat/DownExcel/index.vue",
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()")
      },
      {
        sort: 4,
        menuType: "1",
        label: "消息示例",
        name: "MessagePrompt",
        icon: "Notification",
        path: "MessagePrompt",
        component: "Feat/MessagePrompt/index.vue",
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()")
      },
      {
        sort: 5,
        menuType: "1",
        label: "数字动画",
        name: "CountToExample",
        icon: "NumberOutlined",
        path: "CountToExample",
        component: "Feat/CountToExample/index.vue",
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()")
      },
      {
        sort: 6,
        menuType: "1",
        label: "分屏展示",
        name: "SplitPaneTest",
        icon: "PanelExpansion",
        path: "SplitPaneTest",
        component: "Feat/SplitPaneTest/index.vue",
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()")
      },
      {
        sort: 7,
        menuType: "1",
        label: "折叠列表",
        name: "OverflowList",
        icon: "FolderDetailsReference",
        path: "OverflowList",
        component: "Feat/OverflowList/index.vue",
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()")
      }
    ]
  },
  {
    sort: 3,
    hidden: true,
    label: "自定义组件名称",
    name: "customPage",
    icon: "Concept",
    menuType: "0",
    state: "1",
    createTime: Mock.mock("@now()"),
    children: [
      {
        sort: 1,
        menuType: "1",
        label: "自定义1",
        name: "customPage1",
        icon: "Development",
        path: "customPage1",
        component: "Custom/customPage1/index.vue",
        custom: true,
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()")
      },
      {
        sort: 2,
        menuType: "0",
        label: "自定义2",
        name: "customPage2",
        icon: "Development",
        path: "customPage2",
        component: "Custom/customPage2/index.vue",
        custom: true,
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()"),
        children: [
          {
            sort: 1,
            menuType: "1",
            label: "自定义2-1",
            name: "customPage1-1",
            icon: "Development",
            path: "customPage1-1",
            component: "Custom/customPage1/index.vue",
            custom: true,
            hidden: true,
            state: "1",
            createTime: Mock.mock("@now()")
          },
          {
            sort: 2,
            menuType: "1",
            label: "自定义2-2",
            name: "customPage2-2",
            icon: "Development",
            path: "customPage2-2",
            component: "Custom/customPage2/index.vue",
            custom: true,
            hidden: true,
            state: "1",
            createTime: Mock.mock("@now()")
          }
        ]
      }
    ]
  },
  {
    label: "系统管理",
    name: "SystemManagement",
    icon: "ShopOutlined",
    sort: 4,
    menuType: "0",
    hidden: true,
    state: "1",
    createTime: Mock.mock("@now()"),
    children: [
      {
        sort: 1,
        menuType: "1",
        label: "账号管理",
        name: "AccountManagement",
        icon: "GroupAccount",
        path: "account-management",
        component: "System/Account/index.vue",
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()")
      },
      {
        sort: 2,
        menuType: "1",
        label: "角色管理",
        name: "RoleManagement",
        icon: "Events",
        path: "role-management",
        component: "System/Role/index.vue",
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()")
      },
      {
        sort: 3,
        menuType: "1",
        label: "菜单管理",
        name: "MenuManagement",
        icon: "Menu",
        path: "menu-management",
        component: "System/Menu/index.vue",
        hidden: true,
        state: "1",
        createTime: Mock.mock("@now()")
      }
    ]
  }
];

export default [
  {
    url: "/menu/list",
    method: "get",
    response: () => {
      return {
        code: 10000,
        message: "成功",
        result: {
          menuList
        }
      };
    }
  },
  {
    url: "/menu/data/list/:page/:size",
    method: "post",
    response() {
      return {
        code: 10000,
        message: "成功",
        result: {
          menuList: menuDataList
        }
      };
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
      };
    }
  }
];
