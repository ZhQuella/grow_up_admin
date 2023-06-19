export default [
  {
    url: "/system/dict/data/public_state",
    method: "get",
    response: ({ body }: any) => {
      return {
        code: 10000,
        message: "成功",
        result: {
          dictList: [
            {
              code: "1",
              label: "启用"
            },
            {
              code: "0",
              label: "禁用"
            }
          ]
        }
      };
    }
  },
  {
    url: "/system/dict/data/role_type",
    method: "get",
    response: ({ body }: any) => {
      return {
        code: 10000,
        message: "成功",
        result: {
          dictList: [
            {
              code: "0",
              label: "普通角色"
            },
            {
              code: "1",
              label: "超级管理员"
            }
          ]
        }
      };
    }
  },
  {
    url: "/system/dict/data/menu_type",
    method: "get",
    response: ({ body }: any) => {
      return {
        code: 10000,
        message: "成功",
        result: {
          dictList: [
            {
              code: "0",
              label: "目录"
            },
            {
              code: "1",
              label: "菜单"
            }
          ]
        }
      };
    }
  }
];
