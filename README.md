<div align="center"> 
   <a href="https://zhquella.github.io/grow_up_admin"> 
      <img alt="VbenAdmin Logo" width="200" height="200" src="https://gadmin.top/assets/logo-d04b43b8.png"> 
   </a>
   <h1 style="font-size: 46px;">Vue Grow admin</h1>
</div>

## 简介

Vue Grow admin 是一个中后台开发模版，采用了开箱即用的中后台前端解决方案，主要使用了技术栈如下：

- [Vite2](https://cn.vitejs.dev/)
- [Vue3](https://cn.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/zh/)
- [VueRouter4](https://router.vuejs.org/zh/)
- [VueUse](https://vueuse.org/)
- [axios](http://axios-js.com/)
- [Element-Plus](https://element-plus.gitee.io/zh-CN/)
- [Echarts](https://echarts.apache.org/zh/index.html)
- [xicons](https://xicons.org/#/)
- [taillwindCSS](https://tailwindcss.com/)

## 特性

- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**：可配置的主题
- **国际化**：内置完善的国际化方案
- **Mock 数据** 内置 Mock 数据方案
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件

## 功能内容

1. 总览
    1. [x] 主题变更
    2. [x] 多语言
    3. [ ] 项目文档(待开发，文档与项目本身剥离)
2. 用户登录
    1. [ ]账号密码登录(待完善，完善密码规则)
    2. [x] 手机号码登录
    3. [ ] 扫码登录(需要完善)
    4. [ ] 第三方登录(暂不支持，后续通过配置方式支持)
    5. [x] 忘记密码
3. 系统页面
    1. [x] 动态路由注册
    2. [ ] 前端路由权限(待完善)
    3. [x] 菜单搜索
    4. [ ] 消息管理(待完善,对接socket)
    5. [ ] 系统帮助(使用MD文档可以对每个开发模块进行介绍)
    6. [ ] 用户资料
    7. [x] 动态菜单
4. 通用组件
    1. [x] 自定义表头
    2. [x] 自定义查询条件
    3. Dialog(,支持全屏，可拖动，限制在屏幕内)
5. 系统模块
    1. [x] 工作台
    2. Dashboard
        1. [x] 分析页面
        2. [x] 数据报表
    3. 列表页面
        1. [x] 普通列表
        2. [x] 虚拟列表
        3. [ ] 卡片列表(支持无限加载封装方法支持)
    4. 功能
        1. [x] 引导
        2. [x] 标签操作(通过Hooks支持)
        3. [ ] 下载Excel(待完善，只完成本地导出)
        4. [x] 消息示例
        5. [ ] 打印
        6. [ ] 图片预览(需要支持放大，缩小，旋转，上一张，下一张等)
        7. [ ] 全屏(Hooks实现)
        8. [ ] 导入Excel
        9. [ ] Socket连接(,封装Class方法)
    5. 页面
        1. 表单页
            1. [ ] 基础表单(表单验证)
            2. [ ] 分步表单
        2. [ ] 详情(封装统一组件用于展示内容，类似ElForm)
        3. [ ] 个人详情(支持编辑)
        4. [ ] 动态表单
    6. 组件
        1. [ ] 图片裁剪
        2. [ ] 数字动画
        3. [ ] 编辑器
            1. [ ] JSON编辑器
            2. [ ] Markdown编辑器
            3. [ ] 富文本(支持预览)
            4. [ ] 代码编辑器(支持预览)
        4. [ ] 二维码组件
        5. [ ] 密码强度组件(页面未添加，组件开发完成)
        6. [ ] 分屏组件(可以拖动)
        7. [ ] 拖拽
        8. [ ] 拖拽排序
    7. 系统管理
        1. [ ] 账号管理
        2. [ ] 角色管理
        3. [ ] 菜单管理
        4. [ ] 部门管理
        5. [ ] 人员管理
    8. 自动化工具
        1. [ ] 页面设计器
        2. [ ] 流程引擎
        3. [ ] 规则引擎
        4. [ ] 配置表格(可视化配置表头)
        5. [ ] 配置Echarts(生成JSON配置)
        6. [ ] 小程序(通过表格转化成Echarts)

## 预览

- [vue-grow-admin](https://gadmin.top) - 完整版站点

## 文档

待补充...

## 准备

- [node](http://nodejs.org/) v16.* 以上版本
- [Vite](https://vitejs.dev/) 熟悉Vite新特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) 熟悉TypeScript基本语法
- [EcamScript6](http://es6.ruanyifeng.com/) 熟悉 es6 基本语法
- [vue-router](https://router.vuejs.org/zh/) 熟悉 vue-router 基本使用
- [Element-Plus](https://element-plus.gitee.io) 基本使用

## 安装使用

- 拉取项目代码

```bash
git clone https://github.com/ZhQuella/grow_up_admin.git
```

- 安装依赖

```bash
cd grow_up_admin

yarn
```

- 运行

```bash
yarn dev
```

- 打包

```bash
yarn build
```

## Git 贡献提交规范

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中

## 维护者

[张鱼烧。](https://github.com/ZhQuella)  
[Null](https://github.com/han-han-06)  
[hello-nothing](https://github.com/hello-nothing)  
[xiaogonggong-w](https://github.com/xiaogonggong-w)

## 如何贡献

非常欢迎你的加入，大家共同完善这个开源框架！提交一个 Pull Request。

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## 交流

`Grow-Admin`开源免费的项目，在帮助开发者更方便地进行中大型管理系统开发，同时也提供 QQ 交流群使用问题欢迎在群内提问。由于功能未完善暂时不提供给企业使用。如需`商业使用请联系作者`

- Qq:827265905  
- Wx:wo_99936
