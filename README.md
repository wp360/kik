# 项目说明：
> Kik 即手机通信录的社交软件，可基于本地通讯录直接建立与联系人的连接，并在此基础上实现免费短信聊天、来电大头贴、个人状态同步等功能。
## git 操作
#### https://github.com 新建项目
```html
echo "# kik" &gt;&gt; README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/wp360/kik.git
git push -u origin master
```
## npm
1. package.json `npm init`
2. 安装依赖包
`npm i express ejs body-parser --save`

`npm i dependable lodash --save`

`npm i express-promise-router --save`

`npm i cookie-parser express-validator express-session connect-mongo connect-flash mongoose passport passport-local --save`

#### 备注：
* bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理.

* dependable [https://www.npmjs.com/package/dependable](https://www.npmjs.com/package/dependable)

* [lodash参考中文文档](http://www.css88.com/doc/lodash/)

* [利用cookie-parser读取cookie](https://segmentfault.com/a/1190000004139342?_ea=504710)

* express-validator是一个中间件，它验证请求的body、 params、 query、 headers 和 cookies，并且如果任何配置的验证规则失败，返回一个错误的响应;

```js
//引入flash(connect-flash)模块,flash是一个可以存储特定信息，显示完成后会被清除的模块
const flash = require('connect-flash')
//这两个模块可以将 cookie 信息保存到 mongodb 中。
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
```

* [mongoose连接错误解决办法：{useMongoClient:true}](http://blog.csdn.net/ganyingxie123456/article/details/75008449)
> WARNING: The `useMongoClient` option is no longer necessary in mongoose 5.x, please remove it.
* [express-session使用理解](https://www.cnblogs.com/xiashan17/p/5897282.html)
```js
    app.use(session({
        secret: 'thisisasecretkey', // 用来注册session id 到cookie中，相当与一个密钥。
        resave: true, // 是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
        saveUninitialized: true,// 强制保存未初始化的会话到存储器
        store: new MongoStore({mongooseConnection:mongoose.connection})// session存储的实例子，一般可以用redis和mangodb来实现
    }))
```
* [nodeJS---express4+passport实现用户注册登录验证](https://www.cnblogs.com/y-yxh/p/5859937.html)
    * passport是一个功能单一，但非常强大的一个模块，支持本地账号验证和第三方账号登录验证。

    * passport是使用”策略“来验证请求，策略是passport中最重要的概念。passport模块本身不能做认证，所有的认证方法都以策略模式封装为插件，需要某种认证时将其添加到package.json即可。

    * 策略模式是一种设计模式，它将算法和对象分离开来，通过加载不同的算法来实现不同的行为，适用于相关类的成员相同但行为不同的场景，比如在passport中，认证所需的字段都是用户名、邮箱、密码等，但认证方法是不同的。

* passport-local 本地验证策略
[参考文章：使用passport-local-mongoose、passport实现用户验证](http://blog.csdn.net/u011750507/article/details/51025480)

[参考文章：Express结合Passport实现登陆认证](http://blog.fens.me/nodejs-express-passport/)

[参考文章：Koa集成权限认证中间件之Passport](http://blog.csdn.net/a1035434631/article/details/78752271)

`npm i bcrypt-nodejs --save`

[参考文章：nodejs 搭建 RESTful API 服务器的常用包及其简介](https://www.cnblogs.com/lihuanqing/p/7229878.html)