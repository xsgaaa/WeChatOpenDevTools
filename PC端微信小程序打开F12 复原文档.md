2023/10/03  PC微信小程序逆向-打开F12

by zhiyuan

> 参考文档：
>
> (微信小程序改包调试patch方案 ) https://drafts.misty.moe/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%94%B9%E5%8C%85%E8%B0%83%E8%AF%95patch%E6%96%B9%E6%A1%88-90662835c05647eebe5651ab041fe145#59e3c200dee64339b835a928ab323263 
>
> (在电脑上直接调试微信WxApkg小程序 图片丢失) https://drafts.misty.moe/%E5%9C%A8%E7%94%B5%E8%84%91%E4%B8%8A%E7%9B%B4%E6%8E%A5%E8%B0%83%E8%AF%95%E5%BE%AE%E4%BF%A1wxapkg%E5%B0%8F%E7%A8%8B%E5%BA%8F-370c7cbbc4bd4d87a329590bf2519720#ad5c875e224047dbb3c069a6e70f8cda
>
> 

### 测试环境

WeChatWin.dll 版本：3.9.7.28  x32

 WeChatAppEx.exe：3.9.7.28  x64

系统：win10  21H2  x64 专业 正版激活

使用软件： 

	1. IDA_Pro_7.7  52pojie   
	2. OD  52pojie     
	3. x64dbg 中文版安装程序(Jun 15 2023) 52pojie
	4. frida 16版   node开发
	5. node v18.15.0  #npm i frida



## PC微信Pacth

PC微信32位解锁LOG日志

### IDA静态分析


```C++
/*
1.使用IDA x32打开 WeChatWin.dll  #第一次需要加载大概0.5小时到2小时 
2.切换到字符串子窗口 shift+F12    搜索（ctrl + f） .cc   双击任意进入
3.在xref行 一般是定位的下一行 查找交叉引用（Ctrl + x）  双击任意进入 尽量找进入后代码少的
4.转换位伪C代码（F5）
*/

int __thiscall sub_66719580(int *this)
{
  int result; // eax
  char v3[232]; // [esp+8h] [ebp-F8h] BYREF
  int v4; // [esp+FCh] [ebp-4h]

  //可以在这里hook
  sub_66608090( //这个函数传入了7个参数 我们需要他的 2 3 4 5  进入函数看看
    2,
    "mars::stn",
    "mars::stn::NetSource::~NetSource",
    "D:\\Tools\\agent\\workspace\\Mars_Release\\mars\\mars\\stn\\src\\net_source.cc", //复现可以搜这里
    "mars::stn::NetSource::~NetSource",
    103,
    0);
  sub_66608400(v3);  //v3也可以看下
  sub_668BA3A0(this + 9); 
  result = *this;
  v4 = 0;
  if ( result )
  {
    if ( (result & 1) == 0 )
    {
      result = *(_DWORD *)(result & 0xFFFFFFFE);
      if ( result )
        result = ((int (__cdecl *)(int *, int *, int))result)(this + 2, this + 2, 2);
    }
    *this = 0;
  }
  return result;
}
```

```C++
//5. 进入双击 sub_66608090 进行重命名分析

_DWORD *__thiscall sub_66608090(_DWORD *this, int a2, int a3, const char *a4, int a5, int a6, int a7, const char *a8)
{
  bool v9; // zf
  int v10; // ecx
  const char *v11; // eax
  int (__cdecl *v12)(_DWORD *, char *); // eax
  char v14[1024]; // [esp+20h] [ebp-410h] BYREF
  int v15; // [esp+42Ch] [ebp-4h]

  *(_BYTE *)this = sub_66603020(a2) != 0;
  memset(this + 2, 0, 0x40u);
  *((_QWORD *)this + 25) = 0i64;
  this[52] = 0;
  this[56] = 0;
  this[57] = 15;
  *((_BYTE *)this + 208) = 0;
  v9 = *(_BYTE *)this == 0;
  v15 = 0;
  this[2] = a2;
  if ( !v9 )
  {
    this[3] = a3;
    this[4] = a5;
    this[5] = a6;
    this[6] = a7;
    sub_66603400(this + 7, 0);
    this[10] = -1;
    this[11] = -1;
    this[12] = -1;
    this[13] = -1;
    this[14] = -1;
    this[15] = -1;
    strncpy((char *)this + 72, a4, 0x80u);
    *((_BYTE *)this + 199) = 0;
    v10 = this[8];
    this[50] = this[7];
    this[51] = v10;
    memset(v14, 0, sizeof(v14));
    v11 = PathName;
    if ( a8 )
      v11 = a8;
    sub_65264380(v14, 0x400u, "-> %s %s", (const char *)this + 72, v11);
    v12 = (int (__cdecl *)(_DWORD *, char *))sub_66603010();
    if ( !v12 || v12(this + 2, v14) > 0 )
      sub_66603080(this + 2, v14);
  }
  return this;
}



//重命名之后
_DWORD *__thiscall sub_66608090(
        _DWORD *this,
        int d_int2,
        int d_namesp_string,
        const char *dsFunctionNamesp_string,
        int dsFilePath_string,
        int dFunctionNamesp_String,
        int d_int_103,
        const char *d_char_0)
{
  bool v9; // zf
  int v10; // ecx
  const char *v11; // eax
  int (__cdecl *v12)(_DWORD *, char *); // eax
  char v14[1024]; // [esp+20h] [ebp-410h] BYREF
  int v15; // [esp+42Ch] [ebp-4h]

  *(_BYTE *)this = sub_66603020(d_int2) != 0;
  memset(this + 2, 0, 0x40u);
  *((_QWORD *)this + 25) = 0i64;
  this[52] = 0;
  this[56] = 0;
  this[57] = 15;
  *((_BYTE *)this + 208) = 0;
  v9 = *(_BYTE *)this == 0;
  v15 = 0;
  this[2] = d_int2;
  if ( !v9 )
  {
    //给结构装填
    this[3] = d_namesp_string; //需要打印的参数
    this[4] = dsFilePath_string;//需要打印的参数
    this[5] = dFunctionNamesp_String;//需要打印的参数
    this[6] = d_int_103;
    sub_66603400(this + 7, 0);
    this[10] = -1;
    this[11] = -1;
    this[12] = -1;
    this[13] = -1;
    this[14] = -1;
    this[15] = -1;
    strncpy((char *)this + 72, dsFunctionNamesp_string, 0x80u); //需要打印的参数
    *((_BYTE *)this + 199) = 0;
    v10 = this[8];
    this[50] = this[7];
    this[51] = v10;
    memset(v14, 0, sizeof(v14)); //给v14 创建内存
    pathName = PathName;
    if ( d_char_0 ) //判断结尾字符  \0
      v11 = d_char_0;
    //结构传入sub_65264380 应该是在做格式化 类似与 string.fromat
    //拼接好的字符串传入v14
    sub_65264380(v14, 0x400u, "-> %s %s", (const char *)this + 72, pathName);
    v12 = (int (__cdecl *)(_DWORD *, char *))sub_66603010();
    if ( !v12 || v12(this + 2, v14) > 0 ) //继续进行判断
       //传入v14
      sub_66603080(this + 2, v14);  //sub_66603080 这个可以进行hook
  }
  return this;
}
//不要关闭
```

### OD动态调试- IDA联调

```asm
1.先重启微信 不要点击登录  打开OD附加上去
2.激活所有线程 删除所有断点 然后运行
3.选中模块WeChatWin.dll 先把基址 复制下来    base:644F0000
4.设置IDA基址偏移 （图：1.1） 设置为OD的基址 0x644F0000 注意前面加0x 确定后会卡一会
5.查看IDA中上面分析的函数sub_66719580 他的地址已经发生变化,可以重新用交叉引用定位一下 （我这里已经设置了偏移）
6.进入OD的WeChatWin.dll模块 双击进入
7.复制sub_66608090的66608090部分 到OD中定位 （Ctrl+G）注意加0x66608090
#你会看到如下汇编代码 
-> 66608090    55              push ebp  #下断点（F2）
66608091    8BEC            mov ebp,esp
66608093    6A FF           push -0x1
66608095    68 86E5C666     push WeChatWi.66C6E586
6660809A    64:A1 00000000  mov eax,dword ptr fs:[0]
666080A0    50              push eax
666080A1    81EC 14040000   sub esp,0x414
666080A7    A1 94355867     mov eax,dword ptr ds:[0x67583594]
666080AC    33C5            xor eax,ebp

#下了断点后 返回微信 动一动界面 或者 点击登录 直到 断住
#查看ESP寄存器  右键堆栈窗口中跟踪
#双击堆栈中第一行 地址位置 得到如下显示
$ ==>    > 66602E91  返回到 WeChatWi.66602E91 来自 WeChatWi.66608090
$+4      > 00000000
$+8      > 66F01868  ASCII "mars::comm"
$+C      > 66F018A0  ASCII 6D,"ars::comm::getNetInfo"
$+10     > 66F01810  ASCII "D:\Tools\agent\workspace\.............."
$+14     > 66F018A0  ASCII 6D,"ars::comm::getNetInfo"
$+18     > 00000032
$+1C     > 00000000

#发现此位置可以拿到我们想要的信息 记录HOOK信息
#HOOK位置1
#基址+偏移 WeChatWin.dll + 2118090  （66608090） 

#开始测试位置2  先把断点解开
#sub_66603080  -> 0x66603080 OD跳转过去下断点  然后微信动一下断住
->66603080    55              push ebp 
66603081    8BEC            mov ebp,esp
66603083    833D D44C6967 0>cmp dword ptr ds:[0x67694CD4],0x0
6660308A    74 7C           je short WeChatWi.66603108
6660308C    56              push esi
6660308D    8B75 08         mov esi,dword ptr ss:[ebp+0x8]
66603090    85F6            test esi,esi
66603092    74 45           je short WeChatWi.666030D9

#查看EAX寄存器 右键 堆栈跟踪
$ ==>    > 00000002
$+4      > 012FE7E8  ASCII "MMPC_StateMgr"
$+8      > 670B0B88  WeChatWi.670B0B88
$+C      > 670B0AA8  ASCII "StateMgr::checkAliveByTimer"
$+10     > 000000C1

#发现此处可以进行hook 多进行测试对比 堆栈 发现此处参数不一定是char*
#所以采用第一个hook点

```

### 使用Frida进行Hook

```js
//先安装node
//然后node新建项目 安装frida  npm i frida
//项目结构
//	hooks 
//		HookWeChatWinDll.js
//	index.js  
```

####  index.js 内容

```js
//导包
const frida = require('frida');
const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
let session, script;
//创建frida 事件回调
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
//编写hook入口
async function hookWeChatWindll() {
    const source = await readFile(path.join(__dirname, '/hooks/HookWeChatWinDll.js'), 'utf8');
    session = await frida.attach("WeChat.exe");
    script = await session.createScript(source);
    script.message.connect(onMessage);
    await script.load();
}
//调用指定的HOOK
hookWeChatWindll().catch(onError);

```

HookWeChatWinDll.js 内容

```js
//frida javascript文档
//https://frida.re/docs/javascript-api/
//使用 模块名 查找当前已加载的模块
var ModuleAddress = Process.findModuleByName('wechatwin.dll');
//使用模块基址+偏移的方式找到hook点
var hookAddress = ModuleAddress.base.add('0x2118090')//2118090  F92DAE
Interceptor.attach(hookAddress, {
    onEnter: function (args) {
        //拿到当前的ESP寄存器
        var esp = this.context.esp;
		//进行寄存器堆栈偏移  我们先拿这两个输出一下 
        // readPointer 转指针 readUtf8String 读文本 
        let txt1 = esp.add('0xC').readPointer().readUtf8String().replace("\n","")
        let txt2 = esp.add('0x10').readPointer().readUtf8String().replace("\n","")
        send([txt1,txt2])
    }
})

```

运行index.js 后即可拿到微信的调试日志  我们关心的是小程序部分 所以可以先打开微信后运行稳定之后在hook

分析日志后发现 小程序的启动页面是一个独立的浏览器 ，真正的小程序是在这个浏览器中重新启动的 

所以我们需要分析 微信自己编译的浏览器 当然是魔改的

## PC 微信 WeChatAppEx.exe Pacth

### IDA静态分析 

同上 不过需要使用64位的 IDA    问题就在于64位IDA无法反编译为C 且代码有大量花指令 我们需要对比32位的进行查看

也就是说我们要分别用32位和64位打开  先分析32位的

#### IDA32

 等待半小时后就能愉快的查看代码了

 通过上面PC微信日志分析后 我们也要打印输出WeChatAppEx.exe的日志信息 原理同上

 问题在于 小程序的exe 是一个浏览器  里面有大量blink v8 等模块的输出 我们需要进行一些筛选

比如 微信小程序加载流程 应该是下载 wxpkg  判断需不需要解密 然后解包  运行 那么下载的wxpkg应该会有文件落地 可以hook File等

也可以搜索 pkg    init  Launch   Applet   md5  sha1 等等关键字 进行定位日志

```C++
//使用 LaunchApplet 定位

if ((unsigned __int8)sub_3555DF0(2))
{
    //这里都在拼接字符串
    sub_3555E80("..\\..\\flue\\browser\\applet\\app\\applet_runtime_manager.cc", 678, 2);
    v97 = sub_F1BBC4((int)&v120, (int)"LaunchApplet", 12);
    v98 = sub_F1BBC4(v97, (int)" app_id = ", 10);
    v99 = a2;
    v100 = *(unsigned __int8 *)(a2 + 11);
    if ( (v100 & 0x80u) != 0 )
    {
      v100 = *(_DWORD *)(a2 + 4);
      v99 = *(_DWORD *)a2;
    }
    v101 = sub_F1BBC4(v98, v99, v100);
    sub_F1BBC4(v101, (int)"; now map size = ", 17);
    sub_EEBAE0(*(_DWORD *)(v108 + 100));
    //最终会拼到buf里面 代码太长 大概就是这样 只是截取了一部分
    sub_3555F60(&Buf1); //sub_3555F60 这个函数进去看一下
}

//进入sub_3555F60 后给参数重命名
 
  nNumberOfBytesToWrite = -1;
  v45 = -1;
  v5 = v38;
  p_lpBuffer = &lpBuffer; //解引用
  sub_EED6CE(&lpBuffer); //传入 

//sub_EED6CE 进




```

PC 微信 WeChatAppEx.exe 打印配置

```ASM
#X64dbg 查找交叉引用
#LaunchApplet init_config.productId
#在函数头部下断点  然后加载小程序
-> 00007FF67978FF3C | 41:57                    | PUSH R15              //下断                
00007FF67978FF3E | 41:56                    | PUSH R14                             
00007FF67978FF40 | 41:55                    | PUSH R13                             
00007FF67978FF42 | 41:54                    | PUSH R12                             
00007FF67978FF44 | 56                       | PUSH RSI                             
00007FF67978FF45 | 57                       | PUSH RDI                             
00007FF67978FF46 | 55                       | PUSH RBP                             
00007FF67978FF47 | 53                       | PUSH RBX                             
00007FF67978FF48 | 48:81EC A8020000         | SUB RSP,2A8                          
00007FF67978FF4F | 0F29B424 90020000        | MOVAPS XMMWORD PTR SS:[RSP+290],XMM6 
00007FF67978FF57 | 4D:89C5                  | MOV R13,R8                           
00007FF67978FF5A | 49:89D7                  | MOV R15,RDX                          
00007FF67978FF5D | 49:89CE                  | MOV R14,RCX                          
00007FF67978FF60 | 48:8B05 3112D606         | MOV RAX,QWORD PTR DS:[7FF6804F1198]

#查看RAX寄存器 在堆栈中跟随 然后查看偏移模式
$ ==>             3539666139617877  
$+8               3637306566626139  
$+10              1200FF62B3003431  
$+18              000065F402AA4800  
$+20              0000000000000000  
$+28              0000FF62B340A55B  
$+30              000065F400020900  "http://m......."
$+38              0000000000000092  
$+40              80000000000000A0  
$+48              0000005000000000  
$+50              000065F402AA5400  
$+58              0000000000000000  
$+60              0000FF62B340A55B  
$+68              000065F4003D7860  "C:\\Users\\12585\\Documents\\WeChat Files\\Applet\\......
$+70              0000000000000044  
$+78              8000000000000050  
$+80              000065F4006CF2D0  "C:\\Users\\12585\\Documents\\WeChat Files\\......clientPublicLib.wxapkg"
$+88              0000000000000051  
$+90              8000000000000060  
$+98              000000500000013D  
$+A0              000065F402FA4F00  
$+A8              0000000000000496  
$+B0              80000000000004A0  
$+B8              000065F4003D3A20  "C:\\Users\\12585\\Documents\\WeChat Files\\......\\Applet\\"
$+C0              0000000000000041  
$+C8              8000000000000050  
$+D0              000065F402D042A0  "C:\\Users\\12585\\Documents\\WeChat......\\FileStorage\\.......jpg"
$+D8              0000000000000078  
$+E0              8000000000000080  
$+E8              39313139365F6867  
$+F0              4031336664303133  
$+F8              1300FF6200707061  
$+100             000065F400ACD910  u8"LANCOME兰蔻会员中心"
$+108             0000000000000019  
$+110             8000000000000020  
$+118             000065F400ACC890  u8"LANCOME兰蔻会员中心"
$+120             0000000000000019  

#发现可以进行遍历 使用frida hook 并遍历参数看看

```

```js
//重新写一个hook代码
//index.js 加入
async function hookWeChatAppExexe() {
    const source = await readFile(path.join(__dirname, '/hooks/HookWeChatAppExExe.js'), 'utf8');
    session = await frida.attach(12060); //pid
    script = await session.createScript(source);
    script.message.connect(onMessage);
    await script.load();
}

//HookWeChatAppExExe.js
var base = Process.enumerateModules()[0].base
//读内存文本
function readStdString(s) {
    var flag = s.add(23).readU8()
    if (flag == 0x80) {
        // heap
        var size = s.add(8).readUInt()
        return s.readPointer().readUtf8String(size)
    } else {
        // stack
        return s.readUtf8String(flag)
    }
}
//写内存文本
function writeStdString(s, content) {
    var flag = s.add(23).readU8()
    if (flag == 0x80) {
        // heap
        var orisize = s.add(8).readUInt()
        if (content.length > orisize) {
            throw "must below orisize!"
        }
        s.readPointer().writeUtf8String(content)
        s.add(8).writeUInt(content.length)
    } else {
        // stack
        if (content.length > 22) {
            throw "max 23 for stack str"
        }
        s.writeUtf8String(content)
        s.add(23).writeU8(content.length)
    }
}
                                   //偏移
var pvLaunchAppletBegin = base.add(0x1B3FF3C)

Interceptor.attach(pvLaunchAppletBegin, {
    onEnter(args) {
        send("发现配置! " + readStdString(args[1]))
        for (var i = 0; i < 0x1000; i+=8) {
            try {
                var s = readStdString(args[2].add(i))
                if (s) {
                    send("got str: " + s)
                }
                //修改MD5校验                                      打开F12
                var s1 = s.replaceAll("md5", "md6").replaceAll('"enable_vconsole":false', '"enable_vconsole": true')
                if (s === s1) {
                    
                } else {
                    send("重写配置: " + s1)
                    writeStdString(args[2].add(i), s1)
                }
            } catch (a) {

            }
        }
    }
})
send("完成!")
```

运行index.js  打开小程序 发现已经可以打开 F12 

但是F12不健全（无法调试 只能看）   让我们修复为健全的F12

```asm
#使用X64dbg 搜索 https://applet-debug.com/devtools/wechat_app.html
#或 wechat_app.html 查看交叉引用
00007FF67AB19FA8 | 45:84C0                  | TEST R8B,R8B                       
00007FF67AB19FAB | 74 09                    | JE wechatappex.7FF67AB19FB6        
00007FF67AB19FAD | 48:8D15 0937D404         | LEA RDX,QWORD PTR DS:[7FF67F85D6BD]00007FF67F85D6BD:"https://applet-debug.com/devtools/wechat_web.html"
00007FF67AB19FB4 | EB 07                    | JMP wechatappex.7FF67AB19FBD       
=>00007FF67AB19FB6 | 48:8D15 3237D404         | LEA RDX,QWORD PTR DS:[7FF67F85D6EF]00007FF67F85D6EF:"https://applet-debug.com/devtools/wechat_app.html"
00007FF67AB19FBD | 48:8DBC24 B0000000       | LEA RDI,QWORD PTR SS:[RSP+B0]      
00007FF67AB19FC5 | 48:89F9                  | MOV RCX,RDI                        
00007FF67AB19FC8 | E8 C3CB0800              | CALL wechatappex.7FF67ABA6B90      
00007FF67AB19FCD | 0FB647 17                | MOVZX EAX,BYTE PTR DS:[RDI+17]     
00007FF67AB19FD1 | 84C0                     | TEST AL,AL                         
00007FF67AB19FD3 | 48:8B0F                  | MOV RCX,QWORD PTR DS:[RDI]         

#使用x64dbg 进行pacth 修改汇编
LEA RDX,QWORD PTR DS:[7FF67F85D6EF]00007FF67F85D6EF  => LEA RDX,QWORD PTR DS:[7FF67F85D6BD]00007FF67F85D6BD
#修改完成后分离 再运行index.js
#发现恢复为正常的健全F12 至此可以愉快的调试小程序了


#整理为自动话工具

```

