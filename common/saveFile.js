const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
module.exports={
  saveToDefault(filename,data){
    fs.writeFileSync(path.join(__dirname,"../","output",filename),data);
    console.log(chalk`{green.bold 已保存到 output/${filename}}`)

  }
}