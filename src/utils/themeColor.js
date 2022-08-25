import client from 'webpack-theme-color-replacer/client'
import generate from '@ant-design/colors/lib/generate'

export default {
  getAntdSerials(color) {
    // 淡化（即less的tint）
    const lightens = new Array(9).fill().map((t, i) => {
      return client.varyColor.lighten(color, i / 10)
    })
    // colorPalette变换得到颜色值
    const colorPalettes = generate(color)
    const rgbColors = colorPalettes.map((item) => client.varyColor.toNum3(item.replace('#', '')).join(','))
    return [...lightens, ...colorPalettes, ...rgbColors]
  },
  changeColor(colorsMap) {
    let newColors = []
    // 颜色顺序需要和matchColors严格一致
    const colorNames = ['mainColor', 'greenColor', 'orangeColor', 'redColor']
    colorNames.map((name) => {
      newColors = [...newColors, ...this.getAntdSerials(colorsMap[name])]
    })
    const options = {
      newColors, // new colors array, one-to-one corresponde with `matchColors`
    }
    return client.changer.changeColor(options, Promise)
  },
}
