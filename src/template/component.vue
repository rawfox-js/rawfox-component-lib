<!--这是组件的构建模板-->
<template>
  <!--对根元素绑定的attr改为 v-bind=attrs -->
</template>
<script setup lang="ts">
import { getOuterRemoveEventAttrs } from '@/api/removeEventProps'
defineOptions({
  inheritAttrs: false //防止vue自动同步组件prop
})
export type PropsType = {
  //组件的prop
}
//事件
const emit = defineEmits<{}>()
const props = defineProps<PropsType>()
const attrs = getOuterRemoveEventAttrs() //对根元素传递时使用v-bind=attrs
</script>
<style lang="scss"></style>
