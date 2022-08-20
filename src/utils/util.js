import themeColor from './themeColor.js'
export const updateTheme = (colorsMap) => {
  themeColor.changeColor(colorsMap).finally(() => {})
}
