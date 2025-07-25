<template>
  <Field :label="props.placeholder ?? '请输入文本'" :disabled="props.disabled" :error="props.error"
    :fixed="Boolean(value.length)" class="textarea" :focus="focused" v-bind="attrs">
    <textarea @input="value = textarea!.value" ref="textarea" :disabled="props.disabled" @focus="focused = true" :input-mode="props.inputMode ?? 'text'"
      :readonly="props.readonly" @blur="focused = false"></textarea>
  </Field>
</template>
<script setup lang="ts">
import { getOuterRemoveEventAttrs } from '@/api/removeEventProps'
import { defineCustomProps, setProperty } from '@/api/addOuterProperties'
import Field from './field.vue'
import { onMounted, ref, useTemplateRef } from 'vue'
defineOptions({
  inheritAttrs: false
})
export type PropsType = {
  disabled?: boolean //禁用
  readonly?: boolean //只读
  defaultValue?: string //默认文本
  placeholder?: string //占位文本
  inputMode?: string //软键盘模式
  error?: boolean
}
const textarea = useTemplateRef('textarea')
const emit = defineEmits<{}>()
const props = defineProps<PropsType>()
const attrs = getOuterRemoveEventAttrs()
const value = ref(props.defaultValue ?? '')
const focused = ref(false)
defineExpose({
  value
})
defineCustomProps([
  {
    name: "value",
    get() {
      return value.value
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
.textarea {
  width: fit-content;
  height: fit-content;

  textarea {
    resize: none;
    width: 300px;
    height: 200px;
    border: none;
    font-size: 14px;
    padding: 15px 5px;
    box-sizing: border-box;
    outline: none;
    background-color: transparent;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    &:disabled {
      cursor: not-allowed;

      &::placeholder {
        color: var(--color-disabled);
      }
    }
  }
}
</style>
