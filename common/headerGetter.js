const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
module.exports = {
  async _fileGetter(filename) {
    const finalPath = path.join(__dirname, "../data", filename);
    console.log(chalk`{blue.bold 读取文件"${filename}"}`)
    if (fs.existsSync(finalPath)) {
      return fs.readFileSync(finalPath);
    } else {
      console.log(chalk`{red.bold 文件"${filename}"不存在, 开始创建...}`)
      const {data} = await inquirer.prompt({
        type: "editor",
        message: `请提供Header信息 (文件:${filename} 按Enter开始编辑)`,
        default: `
      
      Cookie获取方法: 
      随便打开编程猫的一个网页, 按F12, 找到Network(网络), 不要关闭这个窗口, 并随便进行一些交互(比如点赞),
      然后看Network中新增的记录, 点击进入, 右侧选择Headers(应该是默认选中的),
      往下拉找到Cookies, 把冒号后面的内容全部复制(不能多也不能少)
      
      下面是示例: 
      __ca_uid_key__=ad26d186-dcd8-46fe-81cc-a41b6970be0f; authorization=eyJ0eXAiOiJnV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDb1RlbWFvIEF1dGgiLCJ1c2VyX3R5cGUiOiJzdHVkZW50IiwiZGV2aWNlX2lkIjowLCJ1c2VyX2lkIjo0MzY0MzYsImlzcyI6IkF1dGggU2VydmljZSIsInBpZCI6IkFOTlJ2SFpUIiwiZXhwIjoxNjMyODA4Njk4LCJpYXQiOjE2Mjg5MjA2OTgsImp0aSI6ImE5ZDY1ZGE3LWVkMDUtNGU3Ni1iNzg5LWU3MTE5NmFjN2ViMyJ9.dPByMaaCsaxftbnU5BZwms1SwlQUVBrJAHSnC6ewHXM; _ga=GA1.2.366175072.16350036; SL_C_23361dd035530_KEY=be556a167e74fcde3a3444a29b25f8e99fb0c59f; SL_C_23361d3035530_VID=Vr9CrEbrFm; acw_tc=2f624a4816297278919198741e7bee4e222f076cc49198d20ec2d9d283853e
      
      [!!!] 请删除这里的所有信息并将你的Header中的Cookie信息粘贴在此处
      编辑完成后保存并关闭编辑器窗口, 程序将自动处理
      `,
        name: "data",
        validate: v => /^[A-Za-z0-9\-_; =.]+$/.test(v) ? true : "输入格式有误. 输入内容应该只包含Cookie, 不能出现其他信息以及多余的换行. (按Enter重新编辑)"
      });
      fs.writeFileSync(finalPath, data);
      console.log(chalk`{green.bold 成功保存文件"${filename}"}`)
      return await this._fileGetter(filename);
    }
  },
  async codemaoCommunity() {
    return await this._fileGetter("codemaoCommunity.txt");
  }
}