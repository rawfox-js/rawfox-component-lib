<template>
  <div class="icon" v-bind="attrs">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { getOuterRemoveEventAttrs } from '@/api/removeEventProps'
import { defineCustomProps, setProperty } from '@/api/addOuterProperties'
defineOptions({
  inheritAttrs: false
})
const attrs = getOuterRemoveEventAttrs()
</script>
<style lang="scss">
:host,.icon {
  display: inline-block;
  width: inherit;
  height: inherit;
  color: inherit;
  ::slotted(svg),
  svg,
  img,
  ::slotted(img) {
    fill: currentColor;
    stroke: currentColor;
    width: inherit;
    height: inherit;
  }
}
</style>
