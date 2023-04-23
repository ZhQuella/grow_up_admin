---
layout: home
title: "Grow Admin"
titleTemplate: The intuitive store for Vue.js

hero:
  image:
    src: image/logo.png
    alt: Grow Admin
  name: "Grow Admin"
  text: "开箱即用的\n中台前端解决方案"
  tagline: "基于Vue3\\Vite\\TypeScript\n最新技术栈开发轻松构建规范且美观的系统"
  actions:
    - theme: brand
      text: "开始使用"
      link: /guide/
    - theme: alt
      text: "Demo 演示"
      link: ""
      target: _blank
    - theme: alt
      text: "Pro 版本"
      link: ""
      target: _blank
# features:
#   - icon: <span class="i-carbon:ibm-toolchain"></span>
#     title: Fully Customizable
#     details: No core utilities, all functionalities are provided via presets.
#     link: /guide/
#     linkText: Getting Started
#   - icon: <span class="i-carbon-meter-alt"></span>
#     title: Instant
#     details: No parsing, no AST, no scanning. It’s 5x faster than Windi CSS or Tailwind JIT.
#   - icon: <span class="i-carbon-wind-gusts"></span>
#     title: Lightweight
#     details: "Zero deps and browser friendly: ~6kb min+brotli"
#   - icon: <span class="i-carbon-ibm-cloud-transit-gateway"></span>
#     title: Rich Integrations
#     details: "First class support of Vite, Webpack, PostCSS, CLI, VS Code, ESLint, etc."
#     link: /integrations/vite
#     linkText: "Learn more"
#   - icon: <span class="i-carbon-asset"></span>
#     title: Shortcuts
#     details: "Aliasing or grouping utilities, dynamically"
#     link: /config/shortcuts
#     linkText: "Configuration and usage"
#   - icon: <span class="i-carbon:code"></span>
#     title: Attributify Mode
#     details: "Group utilities in attributes"
#     link: /presets/attributify
#     linkText: "@unocss/preset-attributify"
#   - icon: <span class="i-carbon-face-wink hover:i-carbon-face-satisfied"></span>
#     title: Pure CSS Icons
#     details: "Use any icon as a single class"
#     link: /presets/icons
#     linkText: "@unocss/preset-icons"
#   - icon: <span class="i-carbon:group-objects"></span>
#     title: Variant Groups
#     details: "Shorthand for group utils with common prefixes"
#     link: /transformers/variant-group
#     linkText: "@unocss/transformer-variant-group"
#   - icon: <span class="i-carbon:at"></span>
#     title: CSS Directives
#     details: "Reuse utils in CSS with @apply directive"
#     link: /transformers/directives
#     linkText: "@unocss/transformer-directives"
#   - icon: <span class="i-carbon-tree-view-alt scale-x--100"></span>
#     title: Compilation Mode
#     details: "Synthesizes multiple classes into one at build time"
#     link: /transformers/compile-class
#     linkText: "@unocss/transformer-compile-class"
#   - icon: <span class="i-carbon:inspection"></span>
#     title: Inspector
#     details: "Inspect and debug interactively"
#     link: /tools/inspector
#     linkText: "@unocss/inspector"
#   - icon: <span class="i-carbon:executable-program"></span>
#     title: CDN Runtime Build
#     details: "Use UnoCSS with one line of CDN import"
#     link: /integrations/runtime
#     linkText: "@unocss/runtime"
---

<style lang="scss">
.VPHome {
  .container {
    .text {
      margin-top: 20px!important;
    }
    .clip {
      color: transparent;
      --vp-home-hero-name-background: linear-gradient( 292deg, #8b5cf6 50%, #d946ef );
      -webkit-text-fill-color: transparent;
    }
    .tagline {
      font-size: 16px;
    }
  }
  .image-container {
    transform: translateY(10px);
  }
  .image-bg {
    background-image: linear-gradient( 292deg, #8b5cf6 50%, #d946ef );
    filter: blur(80px);
  }
}
</style>
