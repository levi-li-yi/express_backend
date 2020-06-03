var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const qs = require('querystring');

var dbConfig = require('../db/config');
var sql = require('../db/usersql');

// 创建连接池,注意设置(ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';)
var pool = mysql.createPool(dbConfig.mysql);
// 响应JSON数据
var responseJSON = function(res, data) {
  if(typeof data === 'undefined') {
    res.json(
      {
        code: '-200',
        msg: 'error'
      }
    )
  } else {
    res.json(data)
  }
}

router.post('/addUser', function(req, res) {
  console.log('准备连接');
  var param = req.body || req.params;
  pool.getConnection(function(err, connection) {
    // 建立连接增加一个用户信息
    connection.query(sql.insert, [param.id, param.name, param.password], function (err, result) {
      if (err) {
        console.log(err)
      }
      if(result) {
        result = {
          code: 200,
          msg: '增加成功'
        }
      }
      responseJSON(res, result);
      connection.release();
    })
  })
});

module.exports = router;
