// import { MockMethod } from "vite-plugin-mock";

export default [{
  url: "/user/info",
  method: "get",
  response: () => { 
    return {
      code: 10000,
      message: "成功",
      result: {
        userName: "李二狗",
        dept: "人力资源二部"
      }
    }
  }
}];
