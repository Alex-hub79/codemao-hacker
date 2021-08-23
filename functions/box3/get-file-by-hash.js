const {prompt} = require("inquirer");
const axios = require("axios");

module.exports = {

  async main() {

    const {hash} = await prompt({
      name: "hash",
      message: "输入hash (示例: QmZ8iYAmzDVv4cuV2kBH87DGmpDg11Kn4xukCKAcQjN4Qs)",
      type: "input",
      validate: v => {
        // console.log(v);
        if (!v) return "请输入hash";
        if (!/^[A-Za-z0-9]+$/.test(v)) return `"${v}" 不是有效的hash`;
        return true
      }
    });
    const fileTypes = ["代码脚本(.js)", "音乐/音效(.mp3)", "模型(.vb)"]
    const {fileType} = await prompt({
      name: "fileType",
      message: "选择文件类型",
      type: "list",
      choices: fileTypes
    });
    let fileExtra = [".js", ""/*mp3没有后缀*/, ".vb"][fileTypes.indexOf(fileType)];
    let {data} = await axios.get("https://static.box3.codemao.cn/block/" + hash + fileExtra);
    require("../../common/saveFile").saveToDefault(`${hash}${fileExtra || ".mp3"}`, data);

  }

}