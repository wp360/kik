'use strict';

const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser((user,done) => {
    done(null,user.id);
});

// deserializeUser 在每次请求的时候将从 session 中读取用户对象
passport.deserializeUser((id, done) => {
    User.findById(id,(err,user) => {
        done(err,user);
    });
});

passport.use('local.signup',new LocalStrategy({
    usernameField: 'email',
    passwordFiled: 'passowrd',
    passReqToCallback: true
},(req,email,password,done) => {
    User.findOne({'email':email},(err,user) => {
        if(err){
            return done(err);
        }
        if(user){
            return done(null,false,req.flash('error','用户邮箱已经存在'));
        }

        const newUser = new User();
        newUser.username = req.body.username;
        newUser.fullname = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save((err) => {
            done(null,newUser);
        });
    });
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordFiled: 'passowrd',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({
        'email': email
    }, (err, user) => {
        if (err) {
            return done(err);
        }
        const messages = [];
        if(!user || !user.validUserPassword(password)){
            messages.push('邮箱不存在或密码错误！');
            return done(null, false, req.flash('error',messages));
        }
        return done(null,user);
    });
}));