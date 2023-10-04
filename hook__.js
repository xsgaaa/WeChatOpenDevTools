


//var base = Process.enumerateModules()[0].base
var base = Process.findModuleByName("WeChatAppEx.exe").base
//Native Pointer


//HOOK F12配置 替换原本内容

var pvWechatapphtml = base.add(0x2EC9FBD) 

Interceptor.attach(pvWechatapphtml, {
    onEnter(args) {
        this.context.rdx = base.add(0x7C0D6BD);
        send("已还原完整F12")
    }
})

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
var pvLaunchAppletBegin = base.add(0x1B3FF48) 

//HOOK 启动配置 
Interceptor.attach(pvLaunchAppletBegin, {
    onEnter(args) {
        send("HOOK加载完成! " + readStdString(args[1]))
        for (var i = 0; i < 0x1000; i+=8) {
            try {
                var s = readStdString(args[2].add(i))
                send(s)
                var s1 = s.replaceAll("md5", "md6").replaceAll('"enable_vconsole":false', '"enable_vconsole": true')
                if (s === s1) {
                    
                } else {
                    //send("changing to str: " + s1)
                    send("拦截到小程序加载")
                    writeStdString(args[2].add(i), s1)
                }
            } catch (a) {

            }
        }
    }
})




send("注入成功!")