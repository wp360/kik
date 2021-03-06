const path = require('path');
const fs = require('fs');

module.exports = function(formidable,Group){
    return{
        SetRouting: function(router){
            router.get('/dashboard',this.adminPage);
            router.post('/uploadFile',this.uploadFile);
            router.post('/dashboard',this.adminPostPage);
        },
        adminPage: function(req,res){
            res.render('admin/dashboard');
        },
        adminPostPage: function(req,res){
            const newGroup = new Group();
            newGroup.name = req.body.group;
            newGroup.region = req.body.region;
            newGroup.image = req.body.upload;
            newGroup.save((err)=>{
                res.render('admin/dashboard');
            })
        },
        uploadFile: function(req,res){
            const form = new formidable.IncomingForm();
            form.uploadDir = path.join(__dirname,'../public/uploads');

            form.on('file',(field,file)=>{
                fs.rename(file.path,path.join(form.uploadDir,file.name),(err)=>{
                    if(err) throw err;
                    console.log('文件更名成功！');
                })
            });
            form.on('error',(err)=>{
                console.log(err);
            });
            form.on('end',()=>{
                console.log('文件上传成功！');
            });
            form.parse(req);///解析request对象
        }
    }
}