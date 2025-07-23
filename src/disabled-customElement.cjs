const fs = require('fs')
const path = require('path')
//关闭customElement选项
//获取文件内容
const viteConfigPath = path.resolve(__dirname, '../vite.config.ts')
console.log(`正在处理vite配置：关闭vue的customElement模式`);
const viteConfig_disabledCustomElement = fs.readFileSync(viteConfigPath, "utf-8").replace(/\/\*_customElement_\*\/true/g,`/*_customElement_*/false`)
fs.writeFileSync(viteConfigPath, viteConfig_disabledCustomElement)
console.log("vite配置已修改")
