import Mock from "mockjs";

export default [
  {
    url: "/role/list/:page/:size",
    method: "post",
    response() {
      const data = [];
      const total = 20;
      for (let i = 0; i < total; i++) {
        const authorityChart = `${Mock.mock("@word(5, 10)")}:${Mock.mock(
          "@word(5, 10)"
        )}:${Mock.mock("@word(5, 10)")}`;
        data.push({
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          "id|+1": `${i + 1}`,
          roleName: Mock.mock("@ctitle(3, 5)"),
          "state|1": ["0", "1"],
          authorityChart,
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
    response() {
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/role/info/:id",
    method: "get",
    response() {
      const authorityChart = `${Mock.mock("@word(5, 10)")}:${Mock.mock("@word(5, 10)")}:${Mock.mock(
        "@word(5, 10)"
      )}`;
      const data = {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "id|+1": "1",
        roleName: Mock.mock("@ctitle(3, 5)"),
        "state|1": ["0", "1"],
        authorityChart,
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
      };
    }
  },
  {
    url: "/role/info",
    method: "put",
    response() {
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/role/info",
    method: "delete",
    response() {
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/role/seate/:id",
    method: "put",
    response() {
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/role/untie/all/:roleId",
    method: "put",
    response() {
      return {
        code: 10000,
        message: "成功"
      };
    }
  },
  {
    url: "/role/persons/:roleId",
    method: "get",
    response() {
      const data = [];
      const total = 5;
      for (let i = 0; i < total; i++) {
        data.push({
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          "id|+1": `${i + 1}`,
          personName: Mock.mock("@cname()"),
          account: Mock.mock("@word(6, 15)"),
          roles: function () {
            const num = Math.floor(Math.random() * 6) + 2;
            let arr = [];
            for (let i = 0; i < num; i++) {
              arr.push(Mock.mock("@ctitle(3, 5)"));
            }
            return arr;
          },
          department: Mock.mock("@ctitle(3, 5)"),
          boundDate: Mock.mock("@now()"),
          operator: Mock.mock("@cname()")
        });
      }

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
    url: "/role/untie/:roleId",
    method: "put",
    response() {
      return {
        code: 10000,
        message: "成功"
      };
    }
  }
];
