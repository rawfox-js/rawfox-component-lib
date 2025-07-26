<template>
  <Ripple class="icon-button" :type.attr="props.type ?? 'normal'" :loading.attt="props.loading ?? false"
    :size.attr="props.size ?? 'default'" :disabled="props.disabled" v-bind="attrs">
    <slot>
      <CircularProgress v-if="props.loading" :unknown="true"></CircularProgress>
    </slot>
  </Ripple>
</template>
<script setup lang="ts">
import { getOuterRemoveEventAttrs } from '@/api/removeEventProps'
import CircularProgress from './circular-progress.vue'
import Ripple from './ripple.vue'
defineOptions({
  inheritAttrs: false
})
export type PropsType = {
  disabled?: boolean
  loading?: boolean
  type?: "normal" | "outlined" | "error" | "text"
  size?: "default" | "large" | "small"
}
const props = defineProps<PropsType>()
const attrs = getOuterRemoveEventAttrs()
</script>
<style lang="scss">
:host([disabled=true]),
:host([loading=true]) {
  pointer-events: none;
}

:host .icon-button {
  cursor: pointer;
  border-radius: 50px;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-weight: 500;
  aspect-ratio: 1 / 1;
  p {
    margin: 0 4px;
  }

  &[size=default] {
    font-size: 14px;
    padding: 6px;

    ::slotted(rf-icon),
    ::slotted(rf-circular-progress), rf-icon, rf-circular-progress {
      $size: 20px !important;
      fill: currentColor !important;
      stroke: currentColor !important;
      width: $size;
      height: $size;
    }
  }

  &[size=large] {
    font-size: 16px;
    padding: 8px;

    ::slotted(rf-icon),
    ::slotted(rf-circular-progress), rf-icon, rf-circular-progress {
      $size: 22px !important;
      fill: currentColor;
      stroke: currentColor;
      width: $size;
      height: $size;
    }
  }

  &[size=small] {
    padding: 5px;
    font-size: 12px;

    ::slotted(rf-icon),
    ::slotted(rf-circular-progress), rf-icon, rf-circular-progress {
      $size: 15px !important;
      fill: currentColor;
      stroke: currentColor;
      width: $size;
      height: $size;
    }
  }

  &[type=normal] {
    background-color: var(--color-theme);
    border: 1.5px solid var(--color-theme);
    color: white !important;
    transition: all 0.2s;

    &:hover,
    &:active {
      background-color: transparent;
      color: var(--color-theme) !important;
      box-shadow: 0px 2px 3px rgba(28, 28, 28, 0.315);
    }

    &[disabled=true],
    &[loading=true] {
      pointer-events: none;
      background-color: var(--color-disabled);
      border-color: var(--color-disabled);
    }
  }

  &[type=outlined] {
    border: 1.5px solid var(--color-theme);
    transition: all 0.2s;
    color: var(--color-theme) !important;

    &:hover,
    &:active {
      background-color: transparent;
      box-shadow: 0px 2px 3px rgba(28, 28, 28, 0.315);
    }

    &[disabled=true],
    &[loading=true] {
      pointer-events: none;
      border-color: var(--color-disabled);
      color: var(--color-disabled);
    }
  }

  &[type=error] {
    border: 1.5px solid red;
    transition: all 0.2s;
    color: red !important;

    .rip {
      background-color: rgba(255, 0, 0, 0.382);
    }

    &:hover,
    &:active {
      background-color: transparent;
      box-shadow: 0px 2px 3px rgba(28, 28, 28, 0.315);
    }

    &[disabled=true],
    &[loading=true] {
      pointer-events: none;
      border-color: var(--color-disabled);
      color: var(--color-disabled);
    }
  }

  &[type=text] {
    border: 1.5px solid transparent;
    transition: all 0.2s;
    color: var(--color-theme) !important;

    &:hover,
    &:active {
      box-shadow: 0px 2px 3px rgba(28, 28, 28, 0.315);
      border: 1.5px solid var(--color-theme);
    }

    &[disabled=true],
    &[loading=true] {
      pointer-events: none;
      color: var(--color-disabled);
    }
  }
}
</style>
