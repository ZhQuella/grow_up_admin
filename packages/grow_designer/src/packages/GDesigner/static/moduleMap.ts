
export const BaseComponent = new Map([
  ["basicsElement", {
    title: "基础元素",
    group:[{
      elName: "图片",
      elType: "basic",
      elTagName: "img",
      elIcon: "Image",
      isChild: false,
      isAdd: false,
      childName: ""
    },{
      elName: "标题",
      elType: "basic",
      elTagName: "h5",
      elIcon: "FontColorsOutlined",
      isChild: false,
      isAdd: false,
      childName: ""
    },{
      elName: "正文",
      elType: "basic",
      elTagName: "p",
      elIcon: "FontSizeOutlined",
      isChild: false,
      isAdd: false,
      childName: ""
    },{
      elName: "短语",
      elType: "basic",
      elTagName: "span",
      elIcon: "ItalicOutlined",
      isChild: false,
      isAdd: false,
      childName: ""
    }]
  }],
  ["layoutElement", {
    title: "布局容器",
    group: [{
      elName: "卡片",
      elType: "eleModule",
      elTagName: "el-card",
      elIcon: "IdcardOutlined",
      isChild: true,
      isAdd: false,
      childName: ""
    },{
      elName: "选项卡",
      elType: "eleModule",
      elTagName: "el-tabs",
      elIcon: "DataBaseAlt",
      isChild: true,
      isAdd: true,
      childName: "el-tab-pane"
    },{
      elName: "弹性盒子",
      elType: "eleModule",
      elTagName: "el-row",
      elIcon: "OpenPanelRight",
      isChild: true,
      isAdd: true,
      childName: "el-col"
    },{
      elName: "分割线",
      elType: "eleModule",
      elTagName: "el-divider",
      elIcon: "BorderVerticleOutlined",
      isChild: false,
      isAdd: false,
      childName: ""
    }]
  }]
]);


export const BusinessComponent = new Map();

export const AtomicComponent = new Map();

export const specificComponent = new Map([
  ['el-tab-pane',{
    elName: "选项",
    elType: "eleModule",
    elTagName: "el-tab-pane",
    elIcon: "IdcardOutlined",
    isChild: true,
    isAdd: false,
    childName: ""
  }],
  ['el-col',{
    elName: "布局",
    elType: "eleModule",
    elTagName: "el-col",
    elIcon: "IdcardOutlined",
    isChild: true,
    isAdd: false,
    childName: ""
  }],
])
