// import { MockMethod } from "vite-plugin-mock";
import { customAlphabet } from "nanoid";

export default [
  {
    url: "/account/login",
    method: "post",
    response: ({ body }: any) => {
      const { account, password } = body;
      if (account === "admin" && password === "123789456") {
        const token = customAlphabet("1234567890abcdef", 50)();
        return {
          code: 10000,
          message: "登录成功",
          result: {
            token
          }
        };
      } else {
        return {
          code: 50001,
          message: "账号或密码错误"
        };
      }
    }
  },
  {
    url: "/account/unlock",
    method: "post",
    response: ({ body }: any) => {
      const { password } = body;
      if (password === "123789456") {
        return {
          code: 10000,
          message: "解锁成功"
        };
      } else {
        return {
          code: 50005,
          message: "解锁密码错误"
        };
      }
    }
  }
];
