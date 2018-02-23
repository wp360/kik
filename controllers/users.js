'use strict';
// const _ = require('lodash');

module.exports = function(_,passport){
    return {
        SetRouting: function(router){
            router.get('/',this.indexPage);
            router.get('/signup',this.getSignUp);
            router.get('/home',this.homePage);
            router.post('/signup',this.postSignUp);
        },
        indexPage: function(req,res){
            return res.render('index',{test:'欢迎您！'});
        },
        getSignUp: function(req,res){
            return res.render('signup');
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