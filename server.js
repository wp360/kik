const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');

const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');

const container = require('./container');


container.resolve(function(users){
    // 连接数据库
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://admin:abc123@ds039684.mlab.com:39684/job-data');//mongodb://localhost:27017/数据库名称

    const app = SetupExpress();

    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);
        server.listen(3000,function(){
            console.log('服务监听端口3000');
        });

        ConfigureExpress(app);

        // 建立路由
        const router = require('express-promise-router')();
        users.SetRouting(router);

        app.use(router);
    }

    function ConfigureExpress(app){
        app.use(express.static('public'));
        app.set('view engine','ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));

        app.use(validator());
        app.use(session({
            secret: 'thisisasecretkey',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({mongooseConnection:mongoose.connection})
        }))

        app.use(flash());

        app.use(passport.initialize());
        app.use(passport.session());
    }
    
});