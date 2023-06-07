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
  }
];
