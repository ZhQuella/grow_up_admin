export default [
  {
    key: "getRoleList",
    url: "/role/list/{page}/{size}",
    method: "post"
  },
  {
    key: "createRole",
    url: "/role/info",
    method: "post"
  },
  {
    key: "getRoleInfo",
    url: "/role/info/{id}",
    method: "get"
  },
  {
    key: "modifyRoleInfo",
    url: "/role/info",
    method: "put"
  },
  {
    key: "deleteRoleIds",
    url: "/role/info",
    method: "delete"
  },
  {
    key: "roleChangeState",
    url: "/role/seate/{id}",
    method: "put"
  },
  {
    key: "roleUntieAll",
    url: `/role/untie/all/{roleId}`,
    method: "put"
  },
  {
    key: "roleBoundPersons",
    url: "/role/persons/{roleId}",
    method: "get"
  },
  {
    key: "roleUntieById",
    url: "/role/untie/{roleId}",
    method: "put"
  }
];
