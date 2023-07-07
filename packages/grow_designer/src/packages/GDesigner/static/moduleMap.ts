
export const BaseComponent = new Map([
  ["basicsElement", {
    title: "基础元素",
    group:[{
      elName: "图片",
      elType: "basic",
      elTagName: "img",
      elIcon: "Image"
    },{
      elName: "标题",
      elType: "basic",
      elTagName: "h5",
      elIcon: "FontColorsOutlined"
    },{
      elName: "正文",
      elType: "basic",
      elTagName: "p",
      elIcon: "FontSizeOutlined"
    },{
      elName: "短语",
      elType: "basic",
      elTagName: "span",
      elIcon: "ItalicOutlined"
    }]
  }],
  ["layoutElement", {
    title: "布局容器",
    group: [{
      elName: "卡片",
      elType: "eleModule",
      elTagName: "el-card",
      elIcon: "IdcardOutlined"
    },{
      elName: "选项卡",
      elType: "eleModule",
      elTagName: "el-tabs",
      elIcon: "DataBaseAlt"
    },{
      elName: "布局",
      elType: "eleModule",
      elTagName: "el-row",
      elIcon: "OpenPanelRight"
    },{
      elName: "分割线",
      elType: "eleModule",
      elTagName: "el-divider",
      elIcon: "BorderVerticleOutlined"
    }]
  }]
]);


export const BusinessComponent = new Map();

export const AtomicComponent = new Map();
