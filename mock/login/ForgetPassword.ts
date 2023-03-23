import { customAlphabet } from 'nanoid';
const Range = 999999 - 100000;
const Rand = Math.random();
const verificationCode = `${(100000 + Math.round(Rand * Range))}`;
const phone = "13800138000";
const identifying = customAlphabet('1234567890abcdef', 20)();

export default [
  {
    url: "/verification/code",
    method: "post",
    response: ({ body }: any) => {
      const { phoneNumber, account } = body;
      if (phoneNumber === phone && account === "admin") {
        return {
          code: 10000,
          message: "获取验证码成功",
          result: {
            verificationCode
          }
        };
      } else { 
        return {
          code: 50002,
          message: "手机号不存在或账号不存在"
        }
      }
    },
  },
  {
    url: "/test/verification/code",
    method: "post",
    response: ({ body }: any) => {
      const { account, verificationCode: code } = body;
      if (account === "admin" && code === verificationCode) {
        return {
          code: 10000,
          message: "验证码验证成功",
          result: {
            identifying
          }
        };
      } else { 
        return {
          code: 50003,
          message: "验证码验证失败"
        }
      }
    }
  },
  {
    url: "/modify/account/password",
    method: "post",
    response: ({ body }: any) => {
      const { phoneNumber, verificationCode:code } = body;
      if (phoneNumber === phone && code === verificationCode) {
        return {
          code: 10000,
          message: "获取验证码成功",
          result: {
            identifying
          }
        };
      } else { 
        return {
          code: 50004,
          message: "验证码失效或者不正确"
        }
      }
    }
  }
];
