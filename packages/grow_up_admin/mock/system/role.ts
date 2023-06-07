import Mock from "mockjs";

export default [
  {
    url: "/role/list/:page/:size",
    method: "post",
    response() {
      const data = [];
      const total = 20;
      for (let i = 0; i < total; i++) {
        data.push({
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          "id|+1": i + 1,
          roleName: Mock.mock("@ctitle(3, 5)"),
          "state|1": ["0", "1"],
          authorityChart: Mock.mock("@word(10, 15)"),
          roleCode: Mock.mock("@word"),
          memberNum: Mock.mock("@integer(0, 10)"),
          "roleType|1": ["0", "1"],
          roleMark: Mock.mock("@ctitle(10, 30)"),
          createTime: Mock.mock("@now()"),
          updataTime: Mock.mock("@now()")
        });
      }
      return {
        code: 10000,
        message: "成功",
        result: {
          total,
          data
        }
      };
    }
  },
  {
    url: "/role/info",
    method: "post",
    response(){
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/role/info/:id",
    method: "get",
    response(){
      const data = {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "id|+1": 1,
        roleName: Mock.mock("@ctitle(3, 5)"),
        "state|1": ["0", "1"],
        authorityChart: Mock.mock("@word(10, 15)"),
        roleCode: Mock.mock("@word"),
        memberNum: Mock.mock("@integer(0, 10)"),
        "roleType|1": ["0", "1"],
        roleMark: Mock.mock("@ctitle(10, 30)"),
        createTime: Mock.mock("@now()"),
        updataTime: Mock.mock("@now()")
      };
      return {
        code: 10000,
        result: {
          data
        },
        message: "成功"
      }
    }
  },
  {
    url: "/role/info",
    method: "put",
    response(){
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/role/info",
    method: "delete",
    response(){
      return {
        code: 10000,
        message: "成功"
      };
    }
  }
];
