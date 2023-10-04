
let version = (process.argv[2] + "").toLowerCase();
let bit = (process.argv[3] + "").toLowerCase();
let exePath = (process.argv[4] + "").toLowerCase();

const fs = require('fs');
const path = require('path');
try {
    fs.accessSync(path.join(exePath, "/WeChatWin_old.dll"));
    console.log(`已经是替换后的WeChatWin.dll! 请勿重复运行`)
    return;
} catch {
    
}


let addressFilePath =path.join(__dirname, `/Core/WeChatWin.dll/address_${version}_${bit}.json`);
let address = null;
try {
    fs.accessSync(addressFilePath);
    address = JSON.parse(fs.readFileSync(addressFilePath));
} catch (error) {
    console.log(`暂不支持 ${version}_${bit} 的版本!`)
    return;
}
try {
    address.XwebEnableInspect = parseInt(address.XwebEnableInspect) + 1;
    fs.copyFileSync(path.join(exePath, "/WeChatWin.dll"), path.join(exePath, "/WeChatWin_old.dll"));
    console.log("WeChatWin.dll已备份!", path.join(exePath, "/WeChatWin_old.dll"))
    let fd = fs.openSync(path.join(exePath, "/WeChatWin.dll"), "r+");
    let buf = Buffer.alloc(1);
    buf.hexWrite("85");
    fs.writeSync(fd, buf, 0, 1, address.XwebEnableInspect)
    console.log("完成覆盖!")
} catch (error) {
    console.log(error)
}
