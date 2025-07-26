<template>
  <svg viewBox="0 0 50 50" :unknown.attr="props.unknown" class="circular-progress"
    :style="{ '--dashoffset': value + 'px' }">
    <ellipse class="indicator block" cx="25" cy="25" rx="21" ry="21" fill="none" stroke-width="4"></ellipse>
  </svg>
</template>

<script setup lang="ts">
import { getOuterRemoveEventAttrs } from '@/api/removeEventProps'
import { computed } from 'vue';
defineOptions({
  inheritAttrs: false //防止vue自动同步组件prop
})
export type PropsType = {
  //组件的prop
  value?: number
  unknown: boolean
}
//事件
const props = defineProps<PropsType>()
const attrs = getOuterRemoveEventAttrs() //对根元素传递时使用v-bind=attrs
const circumference = 131.94689145077
const value = computed(() => {
  return circumference * (1 - (props.value ?? 0.4))
})
</script>
<style lang="scss">
.circular-progress {
  stroke-dasharray: 131.94689145077132px;
  width: 50px;
  height: 50px;
  stroke: var(--color-theme);
  &[unknown=true] {
    stroke-dashoffset: 49px;
    animation: circular-progress 1s linear infinite forwards;
  }

  @keyframes circular-progress {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate((0deg));
    }
  }

  &[unknown=false] {
    stroke-dashoffset: var(--dashoffset);
  }
}
</style>
