import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
import { Tree } from "types/Tree";

const deptTree: Tree[] = [
  {
    label: "根部门",
    id: "0",
    children: [
      {
        label: "市场部",
        id: "1",
        children: [
          {
            label: "市场一部",
            id: "2"
          },
          {
            label: "市场二部",
            id: "3"
          },
          {
            label: "市场三部",
            id: "4"
          }
        ]
      },
      {
        label: "销售部",
        id: "5",
        children: [
          {
            label: "销售一部",
            id: "6"
          },
          {
            label: "销售二部",
            id: "7"
          }
        ]
      }
    ]
  }
];

const historyList = [
  {
    type: "1",
    tagInfo: "新增",
    operator: Mock.mock("@cname()"),
    date: Mock.mock("@now()"),
    remark: Mock.mock("@ctitle(0, 30)")
  },
  {
    type: "2",
    tagInfo: "启用",
    operator: Mock.mock("@cname()"),
    date: Mock.mock("@now()"),
    remark: Mock.mock("@ctitle(0, 30)")
  },
  {
    type: "3",
    tagInfo: "停用",
    operator: Mock.mock("@cname()"),
    date: Mock.mock("@now()"),
    remark: Mock.mock("@ctitle(0, 30)")
  },
  {
    type: "4",
    tagInfo: "绑定",
    personnel: Mock.mock("@cname()"),
    operator: Mock.mock("@cname()"),
    date: Mock.mock("@now()"),
    remark: Mock.mock("@ctitle(0, 30)")
  },
  {
    type: "5",
    tagInfo: "解绑",
    operator: Mock.mock("@cname()"),
    date: Mock.mock("@now()"),
    remark: Mock.mock("@ctitle(0, 30)")
  },
  {
    type: "6",
    tagInfo: "重置密码",
    operator: Mock.mock("@cname()"),
    date: Mock.mock("@now()"),
    remark: Mock.mock("@ctitle(0, 30)")
  },
  {
    type: "7",
    tagInfo: "修改",
    operator: Mock.mock("@cname()"),
    date: Mock.mock("@now()"),
    remark: Mock.mock("@ctitle(0, 30)")
  }
];

export default [
  {
    url: "/dept/structure/tree",
    method: "get",
    response() {
      return {
        code: 10000,
        message: "成功",
        result: {
          deptTree
        }
      };
    }
  },
  {
    url: "/account/list/:page/:size",
    method: "post",
    response() {
      const data = [];
      const total = 20;
      for (let i = 0; i < total; i++) {
        data.push({
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          "id|+1": `${i+1}`,
          account: Mock.mock('@string("lower",7, 10)'),
          roleNames: function() {
            const num = Math.floor(Math.random() * 6) + 2;
            let arr = [];
            for(let i = 0; i < num; i++){
              arr.push(Mock.mock("@ctitle(3, 5)"));
            };
            return arr;
          },
          "state|1": ["0", "1"],
          belong: {
            person: Mock.mock("@cname()"),
            department: Mock.mock("@region()"),
            post: Mock.mock("@ctitle(3, 5)")
          },
          "createType|1": ["自动生成", "手动添加"],
          createDate: Mock.mock("@now()")
        });
      }

      return {
        code: 10000,
        message: "成功",
        result: {
          total,
          accountList: data
        }
      };
    }
  },
  {
    url: "/account/info/:id",
    method: "get",
    response() {
      const data = {
        id: "1",
        account: Mock.mock('@string("lower",7, 10)'),
        roleNames: function() {
          const num = Math.floor(Math.random() * 6) + 2;
          let arr = [];
          for(let i = 0; i < num; i++){
            arr.push(Mock.mock("@ctitle(3, 5)"));
          };
          return arr;
        },
        "state|1": ["0", "1"],
        belong: {
          person: Mock.mock("@cname()"),
          department: Mock.mock("@region()"),
          post: Mock.mock("@ctitle(3, 5)")
        },
        "createType|1": ["自动生成", "手动添加"],
        createDate: Mock.mock("@now()")
      };

      return {
        code: 10000,
        message: "成功",
        result: {
          data
        }
      };
    }
  },
  {
    url: "/account/info",
    method: "post",
    response() {
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/account/info",
    method: "put",
    response() {
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/account/info",
    method: "delete",
    response() {
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/account/change/state",
    method: "put",
    response() {
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/account/reset/password",
    method: "put",
    response() {
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/account/unbind",
    method: "put",
    response() {
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/account/history/:id",
    method: "get",
    response() {
      return {
        code: 10000,
        message: "成功",
        result: {
          historyList
        }
      };
    }
  },
  {
    url: "/account/use/record/:id",
    method: "get",
    response() {
      const recordList: any[] = [];
      for (let i = 0; i < 30; i++) {
        recordList.push({
          "loginType|1": ["账号登录", "扫码登录", "手机号登录"],
          personnel: Mock.mock("@cname()"),
          "loginResult|1": ["登录成功", "登录失败"],
          errorMessage: Mock.mock("@ctitle(3, 5)"),
          date: Mock.mock("@now()")
        });
      }
      return {
        code: 10000,
        message: "成功",
        result: {
          recordList
        }
      };
    }
  }
] as MockMethod[];
