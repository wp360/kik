const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    username: {type:String,unique:true},
    fullname: {type:String,unique:true,default: ''},
    email: {type:String,unique:true},
    password: {type:String,default: ''},
    userImage: {type:String,default: 'default.png'},
    weibo: {type:String,default: ''},
    wbTokens: Array,
    qq: {type:String,default: ''},
    qqTokens: Array,
    sentRequest: [{
        username: {type:String,default: ''}
    }],
    request: [{
        userId: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
        username: {type:String,default: ''}
    }],
    friendsList: [{
        friendId: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
        friendName: {type:String,default: ''}
    }],
    totalRequest: {type: Number,default: 0}
});

// 加密
userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
}
// 验证
userSchema.methods.validUserPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User',userSchema);