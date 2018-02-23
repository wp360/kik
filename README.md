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

#### 备注：
* bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理.

* dependable [https://www.npmjs.com/package/dependable](https://www.npmjs.com/package/dependable)

* [lodash参考中文文档](http://www.css88.com/doc/lodash/)