const fs = require('fs')
const path = require('path')
const readline = require('readline')
const srcDir = path.resolve(__dirname, "./components/")
console.log(`正在创建新组件`);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.question("请输入组件名称：", answer => {
  fs.writeFileSync(`${srcDir}/${answer}.vue`, generateTemplate(answer))
  console.log('组件已创建');
  process.exit(0)
})
rl.on("close", () => {
  console.log('你关闭了输入');
  process.exit(0)
})

/**
 * 构建组件模板函数
 * @param {String} name 组件名称
 */
function generateTemplate(name) {
  return`<template>
  <div class="${name}" v-bind="attrs"></div>
</template>
<script setup lang="ts">
import { getOuterRemoveEventAttrs } from '@/api/removeEventProps'
defineOptions({
  inheritAttrs: false
})
export type PropsType = {
  //添加组件prop
}
const emit = defineEmits<{}>()
const props = defineProps<PropsType>()
const attrs = getOuterRemoveEventAttrs()
</script>
<style lang="scss">
.${name}{

}
</style>
`
}
