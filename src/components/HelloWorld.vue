<template>
  <div class="main">
    <div class="color-list">
      <div class="color-item" v-for="(item, index) in colorList" :key="index">
        <div class="color-select">
          <span>{{ item.label }}：{{ item.value }}</span>
          <ColorSelect v-model="item.value" @change="changeColor"></ColorSelect>
        </div>
        <div class="color-level">
          <div class="level-item" v-for="color in getColors(item.value, item.name)" :key="color.label">
            <span class="color-bg" :style="{ background: color.value }"></span>
            <span class="color-name">{{ color.label }}: {{ color.value }}</span>
          </div>
        </div>
      </div>
    </div>
    <h2>自定义样式</h2>
    <div>
      <span class="test1">测试文字-主色</span>
      <span class="test2">测试文字-主色-50%透明度</span>
      <span class="test3">测试文字-绿色</span>
      <span class="test4">测试文字-绿色-50%透明度</span>
      <span class="test5">测试文字-红色</span>
      <span class="test6">测试文字-红色-50%透明度</span>
      <span class="test7">测试文字-橘黄色</span>
      <span class="test8">测试文字-橘黄色-50%透明度</span>
    </div>
    <div>
      <span class="mainColor8">测试文字-mainColor8</span>
      <span class="greenColor8">测试文字-greenColor8</span>
      <span class="redColor8">测试文字-redColor8</span>
      <span class="orangeColor8">测试文字-orangeColor8</span>
    </div>
    <h2>Ant Vue 组件</h2>
    <div>
      <div>
        <a-button type="primary"> Primary </a-button>
        <a-button>Default</a-button>
        <a-button type="dashed"> Dashed </a-button>
        <a-button type="danger"> Danger </a-button>
        <a-button type="primary"> 按钮 </a-button>
        <a-button type="link"> Link </a-button>
        <a-button type="primary" loading />
        <a-button type="primary" shape="circle" loading />
        <a-button type="danger" shape="round" loading />
      </div>
    </div>
    <br />
    <div>
      <a-menu mode="horizontal" :defaultSelectedKeys="['mail']">
        <a-menu-item key="mail"> <a-icon type="mail" />Navigation One </a-menu-item>
        <a-menu-item key="app" disabled> <a-icon type="appstore" />Navigation Two </a-menu-item>
        <a-sub-menu>
          <span slot="title" class="submenu-title-wrapper"><a-icon type="setting" />Navigation Three - Submenu</span>
          <a-menu-item-group title="Item 1">
            <a-menu-item key="setting:1"> Option 1 </a-menu-item>
            <a-menu-item key="setting:2"> Option 2 </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group title="Item 2">
            <a-menu-item key="setting:3"> Option 3 </a-menu-item>
            <a-menu-item key="setting:4"> Option 4 </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
      </a-menu>
    </div>
    <br />
    <div>
      <a-checkbox> Checkbox </a-checkbox>
      <a-checkbox checked> Checkbox </a-checkbox>
      <a-checkbox checked disabled> Checkbox - Disabled </a-checkbox>
    </div>
    <br />
    <div>
      <div>
        <a-date-picker />
      </div>
      <br />
      <div>
        <a-month-picker placeholder="Select month" />
      </div>
      <br />
      <div>
        <a-range-picker />
      </div>
      <br />
      <div>
        <a-week-picker placeholder="Select week" />
      </div>
    </div>
    <div style="width: 300px">
      <a-input placeholder="Basic usage" />
      <br />
      <a-input-search placeholder="input search text" enter-button="Search" size="large" />
    </div>
    <br />
    <div>
      <a-radio-group name="radioGroup" default-value="a">
        <a-radio value="a"> Hangzhou </a-radio>
        <a-radio value="b" disabled> Shanghai </a-radio>
        <a-radio value="c"> Beijing </a-radio>
        <a-radio value="d"> Chengdu </a-radio>
      </a-radio-group>
      <br />
      <a-radio-group default-value="a" button-style="solid">
        <a-radio-button value="a"> Hangzhou </a-radio-button>
        <a-radio-button value="b" disabled> Shanghai </a-radio-button>
        <a-radio-button value="c"> Beijing </a-radio-button>
        <a-radio-button value="d"> Chengdu </a-radio-button>
      </a-radio-group>
    </div>
    <br />
    <div>
      <a-switch default-checked />
      <a-switch default-checked disabled />
    </div>
    <br />
    <div>
      <a-alert message="Success Tips" type="success" show-icon />
      <br />
      <a-alert message="Informational Notes" type="info" show-icon />
      <br />
      <a-alert message="Warning" type="warning" show-icon />
      <br />
      <a-alert message="Error" type="error" show-icon />
      <br />
      <a-alert
        message="Success Tips"
        description="Detailed description and advices about successful copywriting."
        type="success"
        show-icon
      />
      <br />
      <a-alert
        message="Informational Notes"
        description="Additional description and informations about copywriting."
        type="info"
        show-icon
      />
      <a-alert message="Warning" description="This is a warning notice about copywriting." type="warning" show-icon />
      <br />
      <a-alert message="Error" description="This is an error message about copywriting." type="error" show-icon />
    </div>
  </div>
</template>

<script>
import ColorSelect from './Select/ColorSelect'
import variables from '../styles/variables.less'
import generate from '@ant-design/colors/lib/generate'
import { updateTheme } from '@/utils/util.js'
export default {
  components: {
    ColorSelect,
  },
  data() {
    return {
      variables,
      colorList: [
        {
          name: 'mainColor',
          label: '主色',
          value: variables.mainColor,
        },
        {
          name: 'greenColor',
          label: '绿色',
          value: variables.greenColor,
        },
        {
          name: 'redColor',
          label: '红色',
          value: variables.redColor,
        },
        {
          name: 'orangeColor',
          label: '橘黄色',
          value: variables.orangeColor,
        },
      ],
      colorsMap: {
        mainColor: variables.mainColor, // 主色
        greenColor: variables.greenColor, // 绿色
        redColor: variables.redColor, // 红色
        orangeColor: variables.orangeColor, // 橘黄色
      },
    }
  },
  methods: {
    getColors(color, name) {
      const colors = generate(color).map((item, index) => {
        const i = index + 1
        return {
          label: `${name}${i !== 6 ? i : ''}`,
          value: item,
        }
      })
      return colors
    },
    changeColor() {
      const colorsMap = {}
      this.colorList.map((item) => {
        colorsMap[item.name] = item.value
      })
      updateTheme(colorsMap)
    },
  },
}
</script>

<style lang="less" scoped>
// 强制覆盖link按钮的默认透明边框
.ant-btn-link:hover,
.ant-btn-link:focus,
.ant-btn-link:active {
  border-color: transparent !important;
}
// danger按钮特殊处理下active颜色
.ant-btn-danger:active,
.ant-btn-danger.active {
  background-color: @redColor7;
  border-color: @redColor7;
}
.main {
  text-align: left;
}
.color-list {
  display: flex;
  .color-item {
    width: 25%;
    .color-select,
    .level-item {
      display: flex;
      align-items: center;
    }
    .color-bg,
    .color-name {
      width: 50%;
      height: 30px;
      line-height: 30px;
    }
  }
}
.test1 {
  color: @mainColor;
}
.test2 {
  color: fade(@mainColor, 50%);
}
.test3 {
  color: @greenColor;
}
.test4 {
  color: fade(@greenColor, 50%);
}
.test5 {
  color: @redColor;
}
.test6 {
  color: fade(@redColor, 50%);
}
.test7 {
  color: @orangeColor;
}
.test8 {
  color: fade(@orangeColor, 50%);
}
.mainColor8 {
  color: @mainColor8;
}
.greenColor8 {
  color: @greenColor8;
}
.redColor8 {
  color: @redColor8;
}
.orangeColor8 {
  color: @orangeColor8;
}
</style>
