# WeChatOpenDevTools

### 介绍

这是一个专门为爬虫领域制作的库,用来快速调试PC端的微信浏览器和微信小程序.原理是利用Frida Hook微信的配置项,并使用反汇编技术修改了微信的指令集。

**注意只支持 Window 平台！！！！**

### 使用方式

微信浏览器打开F12需要运行 WeChatWin.dll.js  并传入参数

#### 使用vscode

```json
//注意提前把微信给彻底关闭 
//你可以新建一个运行配置 launch.json 然后运行
 {
      "type": "node",
      "request": "launch",
      "name": "WeChatWin.dll",
      "skipFiles": [
          "<node_internals>/**"
      ],
      "program": "${workspaceFolder}\\WeChatWin.dll.js",
    //在这里分别传入 版本号  程序位    WeChatWin.dll所在的路径
      "args": ["3.9.7.29","x64","C:/Program Files/Tencent/WeChat/[3.9.7.29]"]
}
```

#### 使用cmd命令行

```js
//注意提前把微信给彻底关闭 
//你可以使用命令行运行
//在WeChatWin.dll.js的目录运行命令行
//    代码文件         微信版本  位         "WeChatWin.dll的绝对路径"
node WeChatWin.dll.js 3.9.7.29 x64 "C:/Program Files/Tencent/WeChat/[3.9.7.29]"
```

#### 运行后回显

```powershell
//显示如下即可
PS H:\WeChatOpenDevTools> node WeChatWin.dll.js 3.9.7.29 x64 "C:/Program Files/Tencent/WeChat/[3.9.7.29]"
WeChatWin.dll已备份! c:\program files\tencent\wechat\[3.9.7.29]\WeChatWin_old.dll
完成覆盖!

//错误处理    部分用户C盘微信安装目录没有权限 设置权限即可
```

#### 运行微信查看效果

![微信](./doc/png/wx01.png)

![微信打开位置](./doc/png/wx02.png)

![开发者工具](./doc/png/wx03.png)

或者可以在网页中右键

![右键打开](./doc/png/wx04.png)