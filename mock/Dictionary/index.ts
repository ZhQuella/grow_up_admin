
export default [
  {
    url: "/system/dict/data/account_state",
    method: "get",
    response: ({ body }: any) => { 
      return {
        code: 10000,
        message: "成功",
        result: {
          dictList: [{
            code: "1",
            label: "启用"
          },{
            code: "0",
            label: "禁用"
          }]
        }
      }
    }
  }
];
