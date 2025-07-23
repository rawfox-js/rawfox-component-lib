const fs = require('fs')
const path = require('path')
const componentDir = path.resolve(__dirname, 'components')
const entriesDir = path.resolve(__dirname, 'entries')
const vueFiles = fs.readdirSync(componentDir)
const componentNamesAndPaths = []
const component = []
fs.rmSync(entriesDir, { recursive: true, force: true })
fs.mkdirSync("./src/entries")
console.log("正在处理组件入口文件")
console.log("组件列表：");
console.log(vueFiles.join("\n"))
for (const i of vueFiles) {
  const name = i.replace(/\.vue/, "")
  console.log(`正在创建并写入：./src/entries/${i.replace(/\.vue/, "")}.ts`);
  fs.writeFileSync("./src/entries/" + i.replace(/\.vue/, "") + ".ts", `import { defineCustomElement } from 'vue';\nimport ${nameToPascalCase(name)} from '../components/${name}.vue';\nwindow.customElements.define('rf-${name}', defineCustomElement(${nameToPascalCase(name)},{shadowRoot: true}));\n`)
  component.push(name)
  componentNamesAndPaths.push(`${name[0].toUpperCase() + name.slice(1)}: resolve(__dirname, "./src/entries/${name}.ts")`)
}
console.log(`正在重构建主入口文件：./src/entries/main.ts`);
fs.writeFileSync('./src/entries/main.ts', "import '../style/main.css';\n"+component.map( i => `export * from './${i}';`).join("\n"))
const viteConfigPath = path.resolve(__dirname, '../vite.config.ts')
console.log(`正在处理vite配置：打开vue的customElement模式`);
const viteConfig_disabledCustomElement = fs.readFileSync(viteConfigPath, "utf-8").replace(/\/\*_customElement_\*\/false/g,`/*_customElement_*/true`)
fs.writeFileSync(viteConfigPath, viteConfig_disabledCustomElement)
console.log(`vite配置修改完成\n组件入口文件构建完成`);
function nameToPascalCase(name) {
  return name.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
}
