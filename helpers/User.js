'use strict';

module.exports = function(){
    return {
        // 注册验证
        SignUpValidation: (req,res,next) => {
            req.checkBody('username','用户名必填').notEmpty();
            req.checkBody('username','用户名长度至少5个字节').isLength({min:5});
            req.checkBody('email','邮箱地址必填').notEmpty();
            req.checkBody('email','邮箱地址格式不正确').isEmail();
            req.checkBody('password','密码必填').notEmpty();
            req.checkBody('password','密码长度至少5个字节').isLength({min:5});
            // 返回验证结果
            req.getValidationResult()
            .then((result) => {
                const errors = result.array();
                const messages = [];
                errors.forEach((error)=>{
                    messages.push(error.msg);
                });
                req.flash('error',messages);
                res.redirect('/signup');
            })
            .catch((err)=>{
                return next();
            })
        },
        // 登录验证
        LoginValidation: (req,res,next) => {
            req.checkBody('email','邮箱地址必填').notEmpty();
            req.checkBody('email','邮箱地址格式不正确').isEmail();
            req.checkBody('password','密码必填').notEmpty();
            req.checkBody('password','密码长度至少5个字节').isLength({min:5});
            // 返回验证结果
            req.getValidationResult()
            .then((result) => {
                const errors = result.array();
                const messages = [];
                errors.forEach((error)=>{
                    messages.push(error.msg);
                });
                req.flash('error',messages);
                res.redirect('/');
            })
            .catch((err)=>{
                return next();
            })
        }
    }
}