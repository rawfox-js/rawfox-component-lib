<!--这是组件的构建模板-->
<template>
  <Filed class="input" v-bind="attrs" :label="props.placeholder ?? '请输入文本'" :error="props.error"
    :disabled="props.disabled" :focus="focused" :fixed="Boolean(value)">
    <template #start>
      <slot name="start" slot="start">{{ $slots.start }}</slot>
    </template>
    <div class="input-container">
      <input ref="input" @input="value = input!.value" :min="props.min" :max="props.max"
        :readonly="props.readonly" :disabled="props.disabled" name="" :type="props.type" @focus="focused = true"
        @blur="focused = false" :input-mode="props.inputMode ?? 'text'" :max-length="props.maxLength" />
      <div class="spin-button" v-if="!props.disabled && props.type == 'number'">
        <Ripple class="up" @click="value = (Number(value) + 1).toString()">
          <svg viewBox="0 -960 960 960">
            <path d="m280-400 200-200 200 200H280Z"></path>
          </svg>
        </Ripple>
        <Ripple class="down" @click="value = (Number(value) - 1).toString()">
          <svg viewBox="0 -960 960 960">
            <path d="M480-360 280-560h400L480-360Z"></path>
          </svg>
        </Ripple>
      </div>
    </div>
    <template #end>
      <slot name="end" slot="end">{{ $slots.end }}</slot>
    </template>
  </Filed>
</template>
<script setup lang="ts">
import { getOuterRemoveEventAttrs } from '@/api/removeEventProps'
import Filed from './field.vue'
import { ref, useTemplateRef } from 'vue'
import Ripple from './ripple.vue'
import { defineCustomProps, setProperty } from '@/api/addOuterProperties'
defineOptions({
  inheritAttrs: false //防止vue自动同步组件prop
})
export type PropsType = {
  disabled?: boolean //禁用状体
  placeholder?: string //占位文本
  type: "text" | "password" | "number" //类型
  readonly?: boolean //只读
  defaultValue?: string //默认文本
  error?: boolean //错误状态
  maxLength?: number //最大长度
  min?: number //最小数值
  max?: number //最大数值
  inputMode?: string //软键盘模式
}
//事件
const input = useTemplateRef("input")
const props = defineProps<PropsType>()
const attrs = getOuterRemoveEventAttrs() //对根元素传递时使用v-bind=attrs
const value = ref(props.defaultValue ?? "")
const focused = ref(false)
defineExpose({
  value
})
defineCustomProps([
  {
    name: "value",
    get() {
      return value?.value
    },
    set(v) {
      setProperty(() => {
        value.value = v
      })
    }
  }
])
</script>
<style lang="scss">
:host {
  display: inline-flex;
  vertical-align: middle;
}

.input {
  width: 250px;
  color: var(--color-primary);
  display: inline-flex;
  vertical-align: middle;

  .input-container {
    position: relative;
    width: 100%;
    height: 100%;

    .spin-button {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .up,
      .down {
        width: fit-content;
        height: fit-content;
        aspect-ratio: 3 / 2;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 3px;

        svg {
          width: 20px;
          height: 20px;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.097);
        }
      }
    }

    input {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      outline: none;
      border-radius: 0px;
      border: none;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background: transparent;
      font-size: 14px;

      &:disabled {
        cursor: not-allowed;

        &::placeholder {
          color: var(--color-disabled);
        }
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      -moz-appearance: textfield;
    }
  }
}
</style>
