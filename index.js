var frida = require("frida");
const cmdline = require('cmdline-windows');
const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
function onError(error) {
    console.error(error.stack);
  }
  
  function onMessage(message, data) {
  
    if (message.type === 'send') {
      console.log(message.payload);
    } else if (message.type === 'error') {
      console.error(message.stack);
    }
  }
  
;;(async ()=>{
    const source = await readFile(path.join(__dirname, '/hook.js'), 'utf8');
    var device = await frida.getLocalDevice();
    var processes = await device.enumerateProcesses();
    var pid = -1;
    processes.forEach(async (p_)=>{
        if(p_.name == "WeChatAppEx.exe"){
            let commandLine = cmdline.getCmdline(p_.pid);
            if(commandLine.indexOf("--type=") == -1){
                pid = p_.pid;
            }  
        }
    })
    if(pid==-1){
        console.log("WeChatAppEx.exe 主进程未找到!")
        return;
    }

    session = await frida.attach(pid);
    script = await session.createScript(source);
    script.message.connect(onMessage);
    await script.load();
})().catch(onError);





/*
const pid = 6692; // Replace with the actual process ID

const commandLine = cmdline.getCmdline(pid);
console.log('Command Line:', commandLine);
*/