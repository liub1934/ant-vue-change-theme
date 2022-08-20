<template>
  <a-popover v-model="visible" trigger="click">
    <template #content>
      <div class="color-picker-popover-content">
        <div class="color-picker-content">
          <ChromePicker v-model="colors"></ChromePicker>
        </div>
        <div class="color-picker-footer">
          <a-button type="primary" @click="handleConfirm">确定</a-button>
        </div>
      </div>
    </template>
    <div class="color-picker">
      <div class="color-picker-trigger">
        <span
          class="color-picker-color"
          :style="{
            'background-color': value || 'transparent',
          }"
        ></span>
        <a-icon v-if="value" class="color-picker-icon-down" type="down" />
        <a-icon v-else class="color-picker-icon-close" type="close" />
      </div>
    </div>
  </a-popover>
</template>

<script>
import { Chrome } from 'vue-color'
export default {
  props: {
    value: String,
  },
  components: {
    ChromePicker: Chrome,
  },
  data() {
    return {
      visible: false,
      colors: this.value || '',
    }
  },
  computed: {
    color() {
      return typeof this.colors === 'object' ? this.colors.hex : this.colors
    },
  },
  watch: {
    value(newVal) {
      this.colors = newVal || ''
    },
  },
  methods: {
    handleConfirm() {
      this.triggerEmit(this.color)
    },
    handleClear() {
      this.triggerEmit()
    },
    triggerEmit(val) {
      this.$emit('input', val)
      this.$emit('change', val)
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
.color-picker-popover-content {
  .color-picker-content {
    /deep/ .vc-chrome {
      box-shadow: none;
      .vc-chrome-toggle-btn {
        display: none;
      }
      .vc-chrome-controls {
        align-items: center;
        .vc-chrome-alpha-wrap {
          display: none;
        }
        .vc-chrome-hue-wrap {
          margin-bottom: 0;
        }
      }
    }
  }
  .color-picker-footer {
    text-align: right;
  }
}
.color-picker-trigger {
  height: 40px;
  width: 40px;
  padding: 4px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  .color-picker-color {
    position: relative;
    display: block;
    box-sizing: border-box;
    border: 1px solid #999;
    border-radius: 2px;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .color-picker-icon-down,
  .color-picker-icon-close {
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .color-picker-icon-down {
    color: #fff;
  }
}
</style>
