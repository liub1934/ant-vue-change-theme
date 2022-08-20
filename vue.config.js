const { resolve } = require('path')
const fs = require('fs')
const postcss = require('postcss')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const generate = require('@ant-design/colors/lib/generate').default
// 获取variables.less变量
const getVaribles = (fileUrl) => {
  const colorsMap = {}
  const lessFile = fs.readFileSync(fileUrl, 'utf-8')
  postcss.parse(lessFile).nodes.forEach((node) => {
    if (node.name && node.params) {
      const key = node.name.replace(':', '')
      const value = node.params
      colorsMap[key] = value
    }
  })
  const colorNames = ['mainColor', 'greenColor', 'orangeColor', 'redColor']
  colorNames.map((name) => {
    const colorPalettes = generate(colorsMap[name])
    colorPalettes.map((color, index) => {
      const i = index + 1
      if (i !== 6) {
        colorsMap[`${name}${i}`] = color
      }
    })
  })
  return colorsMap
}
const variables = getVaribles(resolve('./src/styles/variables.less'))
// 获取Ant色系
const getAntdSerials = (color) => {
  // 淡化（即less的tint）
  const lightens = new Array(9).fill().map((t, i) => {
    return ThemeColorReplacer.varyColor.lighten(color, i / 10)
  })
  // colorPalette变换得到颜色值
  const colorPalettes = generate(color)
  const rgbColors = colorPalettes.map((item) => ThemeColorReplacer.varyColor.toNum3(item.replace('#', '')).join(','))
  return [...lightens, ...colorPalettes, ...rgbColors]
}
// 获取匹配颜色
const getMatchColors = () => {
  let matchColors = []
  const changeColors = [variables.mainColor, variables.greenColor, variables.orangeColor, variables.redColor]
  changeColors.map((color) => {
    matchColors = [...matchColors, ...getAntdSerials(color)]
  })
  return matchColors
}
// ThemeColorReplacer插件配置
const ThemeColorReplacerPlugin = new ThemeColorReplacer({
  matchColors: getMatchColors(), // 匹配颜色
  injectCss: true,
  // 改变样式选择器，解决样式覆盖问题
  changeSelector(selector) {
    switch (selector) {
      // case '.ant-calendar-today .ant-calendar-date':
      //   return ':not(.ant-calendar-selected-date):not(.ant-calendar-selected-day)' + selector
      case '.ant-btn:focus,.ant-btn:hover':
        return '.ant-btn:focus:not(.ant-btn-primary):not(.ant-btn-danger):not(.ant-btn-link),.ant-btn:hover:not(.ant-btn-primary):not(.ant-btn-danger):not(.ant-btn-link)'
      case '.ant-btn.active,.ant-btn:active':
        return '.ant-btn.active:not(.ant-btn-primary):not(.ant-btn-danger):not(.ant-btn-link),.ant-btn:active:not(.ant-btn-primary):not(.ant-btn-danger):not(.ant-btn-link)'
      case '.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon':
      case '.ant-steps-item-process .ant-steps-item-icon>.ant-steps-icon':
        return ':not(.ant-steps-item-process)' + selector
      // fixed https://github.com/vueComponent/ant-design-vue-pro/issues/876
      case '.ant-steps-item-process .ant-steps-item-icon':
        return ':not(.ant-steps-item-custom)' + selector
      case '.ant-menu-horizontal>.ant-menu-item-active,.ant-menu-horizontal>.ant-menu-item-open,.ant-menu-horizontal>.ant-menu-item-selected,.ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-submenu-active,.ant-menu-horizontal>.ant-menu-submenu-open,.ant-menu-horizontal>.ant-menu-submenu-selected,.ant-menu-horizontal>.ant-menu-submenu:hover':
      case '.ant-menu-horizontal > .ant-menu-item-active,.ant-menu-horizontal > .ant-menu-item-open,.ant-menu-horizontal > .ant-menu-item-selected,.ant-menu-horizontal > .ant-menu-item:hover,.ant-menu-horizontal > .ant-menu-submenu-active,.ant-menu-horizontal > .ant-menu-submenu-open,.ant-menu-horizontal > .ant-menu-submenu-selected,.ant-menu-horizontal > .ant-menu-submenu:hover':
        return '.ant-menu-horizontal > .ant-menu-item-active,.ant-menu-horizontal > .ant-menu-item-open,.ant-menu-horizontal > .ant-menu-item-selected,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,.ant-menu-horizontal > .ant-menu-submenu-active,.ant-menu-horizontal > .ant-menu-submenu-open,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover'
      case '.ant-menu-horizontal > .ant-menu-item-selected > a':
      case '.ant-menu-horizontal>.ant-menu-item-selected>a':
        return '.ant-menu-horizontal:not(ant-menu-light):not(.ant-menu-dark) > .ant-menu-item-selected > a'
      case '.ant-menu-horizontal > .ant-menu-item > a:hover':
      case '.ant-menu-horizontal>.ant-menu-item>a:hover':
        return '.ant-menu-horizontal:not(ant-menu-light):not(.ant-menu-dark) > .ant-menu-item > a:hover'

      case '.ant-checkbox-checked .ant-checkbox-inner':
        return '.ant-checkbox-checked:not(.ant-checkbox-disabled) .ant-checkbox-inner'
      case '.ant-radio-button-wrapper:hover':
        return '.ant-radio-button-wrapper:not(.ant-radio-button-wrapper-disabled):hover'
      default:
        return selector
    }
  },
})

module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          'primary-color': variables.mainColor,
          'info-color': variables.mainColor,
          'success-color': variables.greenColor,
          'processing-color': variables.mainColor,
          'error-color': variables.redColor,
          'highlight-color': variables.redColor,
          'warning-color': variables.orangeColor,
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
      },
    },
  },

  configureWebpack: (config) => {
    config.plugins.push(ThemeColorReplacerPlugin)
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 自动引入全局less
      patterns: [
        resolve(__dirname, 'node_modules/ant-design-vue/lib/style/color/colorPalette.less'),
        resolve(__dirname, 'src/styles/variables.less'),
      ],
    },
  },
}
