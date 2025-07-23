const fs = require('fs')
const path = require('path')
const componentDir = path.resolve(__dirname, './components')
const docsDir = path.resolve(__dirname, '../docs')
//删除文件夹
//获取文件夹的所有文件
const docsFiles = fs.readdirSync(docsDir).map(i => i.replace(/\.md/, ""))
const componentFiles = fs.readdirSync(componentDir).map(i => i.replace(/\.vue/, ""))
console.log('正在对比组件与文档文件...')
/**
 * 对比两个文件夹的文件名称是否一致
 * @param {Array<string>} dir1 主要文件夹
 * @param {Array<string>} dir2 次要文件夹
 */
function computeDirDiffrence(dir1, dir2) {
  dir1 = dir1.sort()
  dir2 = dir2.sort()
  for (const i in dir1) {
    if (dir2.includes(dir1[i])) {
      continue
    } else return false
  }
  return true
}
/**
 * 获取两个文件夹中不同的文件
 * @param {Array<string>} dir1 主要文件夹哎
 * @param {Array<string>} dir2 次要文件夹
 */
function getDifferenceDirFiles(dir1, dir2) {
  const differenceFiles = []
  dir1 = dir1.sort()
  dir2 = dir2.sort()
  for (const i in dir1) {
    if (dir2.includes(dir1[i])) {
      continue
    } else differenceFiles.push(dir1[i])
  }
  return differenceFiles
}
if (!computeDirDiffrence(componentFiles, docsFiles)) {
  const differenceFiles = getDifferenceDirFiles(componentFiles, docsFiles)
  console.log('发现无文档的组件：\n' + differenceFiles.join("\n"));
  for (let i of differenceFiles) {
    i = i.replace(/\.vue/g, "")
    const contentName = i[0].toUpperCase() + i.slice(1)
    console.log(`正在创建文档：${i}.md`)
    fs.writeFileSync(path.resolve(__dirname, "../docs") + "/" + i + ".md", `# ${contentName}`)
  }
} else {
  console.log('未发现缺少文档的组件');
}
console.log(`组件文档处理完成`);
