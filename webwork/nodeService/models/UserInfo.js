const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  name: {
    type: String, //类型
    require: [true, '请填写用户名'], //是否必须填写
    unique: true, //是否唯一
    trim: true, //去掉空格
    maxlength: [20, '用户名不能超过20个字'] //最大长度
  },
  description: {
    type: String,
    require: [true, '请填写个人简介'],
    maxlength: [500, '个人简介不能超过500个字']
  },
  website: {
    type: String,
    match: [/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/, '请填写合法的网址'], //正则匹配
  },
  phone: {
    type: String,
    match: [/^[1][3,4,5,7,8][0-9]{9}$/, '请填写正确的手机号'],
  },
  email: {
    type: String,
    match: [/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, '请填写正确的邮箱地址'],
  },
  address: {
    type: String,
    default: '江西省抚州市临川区' //默认值
  },
  address: {
    type: String,
    default: '江西省抚州市临川区' //默认值
  },
  occupation: {
    type: String,
    default: '前端开发工程师'
  },
  skill: {
    type: Array,
    default: ['html', 'js', 'css', 'vue', 'react', 'node.js']
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})

module.exports = mongoose.model('UserInfo',UserInfoSchema)
