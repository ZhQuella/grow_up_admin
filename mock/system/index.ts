import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
import { Tree } from "types/Tree";

const deptTree: Tree[] = [{
  label: '根部门',
  id: '0',
  children: [{
    label: '市场部',
    id: '1',
    children: [{
      label: '市场一部',
      id: '2'
    }, {
      label: '市场二部',
      id: '3'

    }, {
      label: '市场三部',
      id: '4'
    }]
  }, {
    label: '销售部',
    id: '5',
    children: [{
      label: '销售一部',
      id: '6'
    }, {
      label: '销售二部',
      id: '7'
    }]
  }]
}];

export default [{
  url: "/dept/structure/tree",
  method: "get",
  response() {
    return {
      code: 10000,
      message: "成功",
      result: {
        deptTree
      }
    }
  }
},
{
  url: "/account/list",
  method: "post",
  response() {
    const data = [];
    for (let i = 0; i < 20; i++) { 
      data.push({
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': i+1,
        'account': Mock.mock('@string("lower",7, 10)'),
        'roleName': Mock.mock('@ctitle(3, 5)'),
        'belong': {
          'person': Mock.mock('@cname()'),
          'department': Mock.mock('@region()'),
          'post': Mock.mock('@ctitle(3, 5)')
        },
        'createType|1': ["自动生成", "手动添加"],
        'createDate': Mock.mock('@now()')
      })
    }

    return {
      code: 10000,
      message: "成功",
      result: {
        total: 20,
        accountList: data
      }
    }
  }
}] as MockMethod[];
