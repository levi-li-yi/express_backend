const mongoose = require('mongoose');

// 定义一个数据模型
const heroSchema = mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
    address: String,
    dowhat: String
}, {collection: 'hero'})

// 导出model模块
const Hero = module.exports = mongoose.model('hero', heroSchema);