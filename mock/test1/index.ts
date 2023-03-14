import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: "/a/b",
    method: "get",
    response: () => { 
      return {
        code: 200,
        data: {
          total: 20,
          list: [] as any
        }
      }
    }
  }
];
