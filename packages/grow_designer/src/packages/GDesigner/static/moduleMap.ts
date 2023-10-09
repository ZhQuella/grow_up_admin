
export const BaseComponent = new Map([
  ["basicsElement", {
    title: "基础元素",
    group:[{
      elName: "图片",
      elType: "basic",
      elTagName: "img",
      elIcon: "Image",
      isChild: false
    },{
      elName: "标题",
      elType: "basic",
      elTagName: "h5",
      elIcon: "FontColorsOutlined",
      isChild: false
    },{
      elName: "正文",
      elType: "basic",
      elTagName: "p",
      elIcon: "FontSizeOutlined",
      isChild: false
    },{
      elName: "短语",
      elType: "basic",
      elTagName: "span",
      elIcon: "ItalicOutlined",
      isChild: false
    }]
  }],
  ["layoutElement", {
    title: "布局容器",
    group: [{
      elName: "卡片",
      elType: "eleModule",
      elTagName: "el-card",
      elIcon: "IdcardOutlined",
      isChild: true
    },{
      elName: "选项卡",
      elType: "eleModule",
      elTagName: "el-tabs",
      elIcon: "DataBaseAlt",
      isChild: true
    },{
      elName: "布局",
      elType: "eleModule",
      elTagName: "el-row",
      elIcon: "OpenPanelRight",
      isChild: true
    },{
      elName: "分割线",
      elType: "eleModule",
      elTagName: "el-divider",
      elIcon: "BorderVerticleOutlined",
      isChild: false
    }]
  }]
]);


export const BusinessComponent = new Map();

export const AtomicComponent = new Map();
