const fs = require('fs')
const path = require('path')
const readline = require('readline')
const updateFileDir = path.resolve(__dirname, '../UPDATE.md')
//获取文件内容
const fileContent = fs.readFileSync(updateFileDir, "utf-8")
//写入文件内容
console.log(`正在记录打包历史`);
//获取用户输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.question("输入打包原因：", (answer) => {
  fs.writeFileSync(updateFileDir, fileContent + "### " + "打包：" + new Date().toLocaleString() + "\n> [!NOTE]\n>\n> " + answer + "\n")
  console.log('更新日志已自动插入完成');
  process.exit(0)
})
rl.on("close", () => {
  console.log("你关闭了输入");
  fs.writeFileSync(updateFileDir, fileContent + "### " + "打包：" + new Date().toLocaleString() + "\n> [!NOTE]\n>\n> 未记录更新内容。\n")
  process.exit(0)
})
