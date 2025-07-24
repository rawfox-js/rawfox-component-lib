<template>
  <div class="field" v-bind="attrs" :fixed.attr="props.fixed" :error.attr="props.error" :focus.attr="props.focus"
    :disabled.attr="props.disabled">
    <div class="border">
      <div class="start-line">
        <div class="hide">
          <slot name="start">{{ $slots.start }}</slot>
        </div>
      </div>
      <div class="middle-line">
        <div class="label">{{ props.label }}</div>
        <p class="hide">{{ props.label }}</p>
      </div>
      <div class="end-line">
        <div class="hide">
          <slot name="end">{{ $slots.end }}</slot>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="start" ref="startClone">
        <slot name="start"></slot>
      </div>
      <slot></slot>
      <div class="end" ref="endClone">
        <slot name="end"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import '../style/main.css'
import { getOuterRemoveEventAttrs } from '@/api/removeEventProps'
import { onMounted, ref } from 'vue'
defineOptions({
  inheritAttrs: false
})
export type PropsType = {
  label: string
  fixed: boolean
  focus: boolean
  disabled?: boolean
  error?: boolean
}
const emit = defineEmits<{}>()
const props = defineProps<PropsType>()
const attrs = getOuterRemoveEventAttrs()

const startClone = ref<HTMLDivElement>()
const endClone = ref<HTMLDivElement>()

onMounted(() => {
  const shadowRoot = startClone.value?.getRootNode?.()
  if (!(shadowRoot instanceof ShadowRoot)) return

  const startSlot = shadowRoot.querySelector('slot[name="start"]') as HTMLSlotElement | null
  const endSlot = shadowRoot.querySelector('slot[name="end"]') as HTMLSlotElement | null

  const cloneAssigned = (slot: HTMLSlotElement | null, target: HTMLElement | undefined) => {
    if (!slot || !target) return
    const nodes = slot.assignedNodes({ flatten: true })
    target.innerHTML = ''
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) return
      target.appendChild(node.cloneNode(true))
    })
  }

  if (startSlot) {
    startSlot.addEventListener('slotchange', () => {
      cloneAssigned(startSlot, startClone.value)
    })
    cloneAssigned(startSlot, startClone.value)
  }

  if (endSlot) {
    endSlot.addEventListener('slotchange', () => {
      cloneAssigned(endSlot, endClone.value)
    })
    cloneAssigned(endSlot, endClone.value)
  }
})
</script>
<style lang="scss">
$padding: 10px;
$border-radius: 4px;
$placeholder-font-size: 12px;
$stroke: 1px;
$default-stroke-color: var(--color-primary);

.field {
  width: 200px;
  height: 50px;
  position: relative;

  .hide {
    opacity: 0;
  }

  svg,
  ::slotted(svg),
  img,
  ::slotted(img) {
    width: 30px;
    height: 30px;
    fill: currentColor;
    color: var(--color-primary-svg);
  }

  .label {
    font-size: 14px;
    color: gray;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    height: 100%;
    top: 0;
    left: $padding + 5px;
    transition: all 0.2s;
    pointer-events: none;
    white-space: nowrap;
  }

  .border {
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    pointer-events: none;

    .start-line,
    .end-line {
      display: flex;
      align-items: center;
    }

    .start-line {
      min-width: $padding;
      height: 100%;
      box-sizing: border-box;
      border-left: $stroke solid $default-stroke-color;
      border-top: $stroke solid $default-stroke-color;
      border-bottom: $stroke solid $default-stroke-color;
      border-radius: $border-radius 0 0 $border-radius;
      transition: all 0.1s;
      padding-left: 10px;
      padding-right: 5px;
    }

    .middle-line {
      width: fit-content;
      height: 100%;
      border-bottom: $stroke solid $default-stroke-color;
      border-top: $stroke solid $default-stroke-color;
      box-sizing: border-box;
      padding: 0 5px;
      transition: all 0.1s;
      position: relative;

      p.hide {
        opacity: 0;
        pointer-events: none;
        margin: 0;
        font-size: $placeholder-font-size;
      }

      .label {
        position: absolute;
        width: 100%;
        left: 0;
      }
    }

    .end-line {
      width: auto;
      height: 100%;
      flex: 1;
      box-sizing: border-box;
      border-right: $stroke solid $default-stroke-color;
      border-bottom: $stroke solid $default-stroke-color;
      border-top: $stroke solid $default-stroke-color;
      border-radius: 0 $border-radius $border-radius 0;
      transition: all 0.1s;
      padding-right: 10px;
    }
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;

    .start,
    .end {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &[focus=true] {
    .border {
      .start-line {
        border-left: $stroke+ 1px solid var(--color-theme);
        border-top: $stroke+ 1px solid var(--color-theme);
        border-bottom: $stroke+ 1px solid var(--color-theme);
      }

      .middle-line {
        border-bottom: $stroke+1px solid var(--color-theme);
        border-top: $stroke+1px solid var(--color-theme);
      }

      .end-line {
        border-right: $stroke+1px solid var(--color-theme);
        border-bottom: $stroke+1px solid var(--color-theme);
        border-top: $stroke+1px solid var(--color-theme);
      }
    }

    svg,
    ::slotted(svg),
    img,
    ::slotted(img) {
      color: var(--color-theme);
    }

    .label {
      color: var(--color-theme);
    }

    .border {
      .middle-line {
        border-top: $stroke solid transparent;
      }
    }

    .label {
      top: calc(100% / 2 * -1);
      font-size: $placeholder-font-size;
    }
  }

  &[fixed=true] {
    .border {
      .middle-line {
        border-top: $stroke solid transparent;
      }
    }

    .label {
      top: calc(100% / 2 * -1);
      font-size: $placeholder-font-size;
    }
  }

  &[error=true] {
    .start-line {
      border-left: $stroke solid var(--color-error) !important;
      border-top: $stroke solid var(--color-error) !important;
      border-bottom: $stroke solid var(--color-error) !important;
    }

    svg,
    ::slotted(svg),
    img,
    ::slotted(img) {
      color: var(--color-error) !important;
    }

    .middle-line {
      border-bottom: $stroke solid var(--color-error) !important;
      border-top: $stroke solid var(--color-error);
    }

    .end-line {
      border-right: $stroke solid var(--color-error) !important;
      border-bottom: $stroke solid var(--color-error) !important;
      border-top: $stroke solid var(--color-error) !important;
    }

    .label {
      color: var(--color-error) !important;
    }
  }

  &[disabled=true] {
    .start-line {
      border-left: $stroke solid var(--color-disabled);
      border-top: $stroke solid var(--color-disabled);
      border-bottom: $stroke solid var(--color-disabled);
    }

    svg,
    ::slotted(svg),
    img,
    ::slotted(img) {
      color: var(--color-disabled);
    }

    .middle-line {
      border-bottom: $stroke solid var(--color-disabled);
      border-top: $stroke solid var(--color-disabled);
    }

    .end-line {
      border-right: $stroke solid var(--color-disabled);
      border-bottom: $stroke solid var(--color-disabled);
      border-top: $stroke solid var(--color-disabled);
    }

    .label {
      color: var(--color-disabled);
    }
  }
}
</style>
