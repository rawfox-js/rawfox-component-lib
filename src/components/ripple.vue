<template>
  <div class="ripple" ref="ripple" @mousedown="addRipple" @mouseup="removeRipple" @mouseleave="removeRipple">
    <slot></slot>
    <div class="ripple-place" ref="ripple-place"></div>
  </div>
</template>
<script setup lang="ts">
export type PropsType = {}
import { useTemplateRef } from 'vue'
const ripple = useTemplateRef("ripple")
const ripplePlace = useTemplateRef("ripple-place")
function getRippleSize() {
  const { width, height } = ripple.value?.getBoundingClientRect() as DOMRect
  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) * 2
}
function getBaseElementOffset() {
  const { left, top } = ripple.value?.getBoundingClientRect() as DOMRect
  return { left, top }
}
function computeRippleLocation(
  rippleSize: number,
  rippleOffset: { left: number, top: number },
  mouseLocation: { x: number, y: number },
  callback: (location: { x: number, y: number }) => void
): void {
  const { x, y } = mouseLocation
  const { left, top } = rippleOffset
  const size = rippleSize
  const res = {
    x: x - left - size / 2,
    y: y - top - size / 2,
  }
  callback(res)
}
function addRipple(e: MouseEvent) {
  computeRippleLocation(getRippleSize(), getBaseElementOffset(), {
    x: e.clientX,
    y: e.clientY
  },
    (location) => {
      const rip = document.createElement("div")
      rip.className = "rip"
      rip.style.setProperty("--size", getRippleSize() + "px")
      rip.style.setProperty("--x", location.x + "px")
      rip.style.setProperty("--y", location.y + "px")
      ripplePlace.value?.append(rip)
    })
}
function removeRipple() {
  const rips = ripple.value?.querySelectorAll(".rip")
  rips?.forEach(i => {
    i.classList.add("out")
    setTimeout(() => i.remove(), 300)
  })
}
</script>
<style lang="scss">
.ripple {
  position: relative;
  overflow: hidden;
  width: fit-content;
  height: fit-content;

  .ripple-place {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .rip {
      animation: rip 0.5s ease normal;
      position: absolute;
      left: var(--x, 0);
      top: var(--y, 0);
      width: var(--size, 100px);
      height: var(--size, 100px);
      background-color: var(--color-theme);
      opacity: 0.4;
      transition: all 0.3s;
      border-radius: 50%;
      &.out{
        opacity: 0;
      }
      @keyframes rip {
        0% {
          transform: scale(0);
        }
      }
    }
  }
}
</style>
