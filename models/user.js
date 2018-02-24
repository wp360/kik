const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    username: {type:String,unique:true},
    fullname: {type:String,unique:true,default: ''},
    email: {type:String,unique:true},
    password: {type:String,default: ''},
    userImage: {type:String,default: 'default.png'},
    weixin: {type:String,default: ''},
    wxTokens: Array,
    qq: {type:String,default: ''},
    qqTokens: Array
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