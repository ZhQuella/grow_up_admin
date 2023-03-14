module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  safelist: ['theme-light','theme-dark','theme-public'],
  important: true,
  theme: {
    screens: {
      sm: "0px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        "PUBLIC_MAIN_COLOR":withOpacity("--public-main-color"),
        "PUBLIC_MAIN_DARK_COLOR": withOpacity("--public-main-dark-color"),
        "BG_COLOR": withOpacity("--bg-color"),
        "BG_COLOR2": withOpacity("--bg-color2"),
        "BG_COLOR3": withOpacity("--bg-color3"),
        "BG_CARD": withOpacity("--bg-card"),
        "WHITE": withOpacity("--white"),
        "MAIN_TEXT": withOpacity("--main-text"),
        "TEXT_LIGHT1": withOpacity("--text-light-1"),
        "TEXT_LIGHT2": withOpacity("--text-light-2"),
        "BORDER_COLOR": withOpacity("--border-color"),
        "BORDER_COLOR2": withOpacity("--border-color2")
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    solveCover,
    createEnterPlugin(30)
  ]
};

function solveCover({ addBase}) { 
  addBase({
    ".el-button": {
      "background-color": "var(--el-button-bg-color, var(--el-color-white))"
    }
  })
}


function withOpacity(variableName) { 
  return ({ opacityValue }) => {
    if (opacityValue) { 
      return `rgba(var(${variableName}), ${opacityValue})`
    };
    return `rgb(var(${variableName}))`;
  };
}

function createEnterPlugin(maxOutput = 20) {
  const createCss = (index, d = 'x') => {
    const upd = d.toUpperCase();
    return {
      [`*> .enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(50px) translateZ(0)`,
      },
      [`*> .-enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(-50px) translateZ(0)`,
      },
      [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]: {
        'z-index': `${10 - index}`,
        'opacity': '0',
        'animation': `enter-${d}-animation 0.4s ease-in-out 0.3s`,
        'animation-fill-mode': 'forwards',
        'animation-delay': `${(index * 1) / 10}s`,
      },
    };
  };
  const handler = ({ addBase }) => {
    const addRawCss = {};
    for (let index = 1; index < maxOutput; index++) {
      Object.assign(addRawCss, {
        ...createCss(index, 'x'),
        ...createCss(index, 'y'),
      });
    }
    addBase({
      ...addRawCss,
      [`@keyframes enter-x-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      [`@keyframes enter-y-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    });
  };
  return { handler };
}
