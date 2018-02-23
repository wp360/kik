'use strict';
// const _ = require('lodash');

module.exports = function(_){
    return {
        SetRouting: function(router){
            router.get('/',this.indexPage);
            router.get('/signup',this.getSignUp);
        },
        indexPage: function(req,res){
            return res.render('index',{test:'欢迎您！'});
        },
        getSignUp: function(req,res){
            return res.render('signup');
        }
    }
}