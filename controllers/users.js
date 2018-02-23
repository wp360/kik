'use strict';
// const _ = require('lodash');

module.exports = function(_){
    return {
        SetRouting: function(router){
            router.get('/',this.indexPage);
        },
        indexPage: function(req,res){
            return res.render('index',{test:'This is a test'});
        }
    }
}