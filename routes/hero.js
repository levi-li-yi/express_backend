var express = require('express');
var router = express.Router();

// 引入数据模型模块
const Hero = require('../models/hero');

// 查询所有hero信息路由
router.get('/hero', (req, res) => {
    // console.log('id: ',req);
    Hero.find({})
    .then(heros => {
        console.log(heros)
        res.json(heros);
    })
    .catch(err => {
        console.log(2);
        res.json(err)
    })
})

/* router.get('/', function(req,res,next){
    console.log(req)
    res.json({name:'admin', pwd:'123'})
}) */

// 通过ObjetId查询单个英雄信息路由
router.get('/hero/:id', (req, res) => {
    // console.log('id: ',req);
    Hero.findById(req.params.id)
    .then(hero => {
        res.json(hero)
    })
    .catch(err => {
        res.json(err)
    })
})

// 添加一个路由信息
router.post('/hero', (req, res) => {
    // 使用create方法储存数据
    Hero.create(req.body, (err, hero) => {
        if (err) {
            res.json(err);
        } else {
            res.json(hero);
        }
    })
})

// 更新一条英雄信息数据路由
router.put('/hero/:id', (req, res) => {
    Hero.findByIdAndUpdate(
        {_id: req.params.id},
        {
            $set: {
                name: req.body.name,
                name: req.body.age,
                name: req.body.sex,
                name: req.body.address,
                name: req.body.dowhat,
            }
        },
        {
            new: true
        }
    )
    .then(hero => res.json(hero))
    .catch(err => res.json(err));
})

// 添加图片路由
router.put('/apppic/:id', (req, res) => {
    Hero.findByIdAndUpdate(
        {_id: req.params.id},
        {
            $push: {
                imgArr: req.body.url
            }
        },
        {
            new: true
        }
    )
    .then(hero => res.json(hero))
    .catch(err => res.json(err));
})

// 删除一条信息路由
router.delete('/hero/:id', (req, res) => {
    Hero.findOneAndRemove({
        _id: req.params.id
    })
    .then(hero => res.send(`${hero.title}删除成功`))
    .catch(err => res.json(err))
})

module.exports = router;