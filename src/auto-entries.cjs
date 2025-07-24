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
  const fileContent = fs.readFileSync(`${componentDir}/${i}`, 'utf-8')

  // 提取 defineCustomProps 区块
  // 提取 defineCustomProps 区块
  const definePropsRegex = /defineCustomProps\(\s*\[((?:.|\n)*?)\]\s*\)/m
  let customPropsString = 'defineCustomProps([])' // 默认值

  const match = definePropsRegex.exec(fileContent)
  if (match) {
    const arrayContent = match[1]

    const objStrings = arrayContent.split(/},\s*(?=\{)/g).map(objStr => {
      if (!objStr.trim().endsWith('}')) objStr += '}'
      return objStr
    })

    const transformedObjects = objStrings.map(objStr => {
      const nameMatch = /name\s*:\s*['"](\w+)['"]/.exec(objStr)
      if (!nameMatch) return objStr
      const propName = nameMatch[1]

      return `{
  name: "${propName}",
  get() {
    //@ts-ignore
    return this._instance?.exposed?.${propName}?.value
  },
  set(v) {
    //@ts-ignore
    if (this._instance?.exposed) this._instance.exposed.${propName}.value = v
  }
}`
    })

    customPropsString = `defineCustomProps([\n${transformedObjects.join(',\n')}\n])`
  }

  console.log(`正在创建并写入：./src/entries/${name}.ts`);
  fs.writeFileSync(
    "./src/entries/" + name + ".ts",
    `import { defineCustomElement } from 'vue';
import ${nameToPascalCase(name)} from '../components/${name}.vue';
import { addOuterProperties, defineCustomProps } from '../api/addOuterProperties';

const Element = addOuterProperties(
  defineCustomElement(${nameToPascalCase(name)}, { shadowRoot: true }),
  ${customPropsString}
)

window.customElements.define('rf-${name}', Element);`
  )

  component.push(name)
  componentNamesAndPaths.push(
    `${name[0].toUpperCase() + name.slice(1)}: resolve(__dirname, "./src/entries/${name}.ts")`
  )
}
console.log(`正在重构建主入口文件：./src/entries/main.ts`);
fs.writeFileSync('./src/entries/main.ts', "import '../style/main.css';\n" + component.map(i => `export * from './${i}';`).join("\n"))
const viteConfigPath = path.resolve(__dirname, '../vite.config.ts')
console.log(`正在处理vite配置：打开vue的customElement模式`);
const viteConfig_disabledCustomElement = fs.readFileSync(viteConfigPath, "utf-8").replace(/\/\*_customElement_\*\/false/g, `/*_customElement_*/true`)
fs.writeFileSync(viteConfigPath, viteConfig_disabledCustomElement)
console.log(`vite配置修改完成\n组件入口文件构建完成`);
function nameToPascalCase(name) {
  return name.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
}
