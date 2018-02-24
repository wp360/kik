'use strict';
// const _ = require('lodash');

module.exports = function(_,passport,User){
    return {
        SetRouting: function(router){
            router.get('/',this.indexPage);
            router.get('/signup',this.getSignUp);
            router.get('/home',this.homePage);
            router.post('/signup',User.SignUpValidation,this.postSignUp);
        },
        indexPage: function(req,res){
            return res.render('index',{test:'欢迎您！'});
        },
        getSignUp: function(req,res){
            const errors = req.flash('error');
            return res.render('signup',{title:'KIK聊天通讯 | 注册页',messages: errors,hasErrors:errors.length > 0});
        },
        postSignUp: passport.authenticate('local.signup',{
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        homePage: function (req, res) {
            return res.render('home');
        }
    }
}