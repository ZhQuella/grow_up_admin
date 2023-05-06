export default [
  {
    key: "getAccountList",
    url: "/account/list/{page}/{size}",
    method: "post"
  },
  {
    key: "createAccount",
    url: "/account/info",
    method: "post"
  },
  {
    key: "modifyAccount",
    url: "/account/info",
    method: "put"
  },
  {
    key: "deleteAccount",
    url: "/account/info",
    method: "delete"
  },
  {
    key: "accountChangeState",
    url: "/account/change/state",
    method: "put"
  },
  {
    key: "accountResetPassword",
    url: "/account/reset/password",
    method: "put"
  },
  {
    key: "accountUnbind",
    url: "/account/unbind",
    method: "put"
  },
  {
    key: "accountHistory",
    url: "/account/history/{id}",
    method: "get"
  },
  {
    key: "usedRecordList",
    url: "/account/use/record/{id}",
    method: "get"
  }
];
