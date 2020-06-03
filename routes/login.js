var express = require('express');
var router = express.Router();

router.get('/login', function(req,res,next){
    // console.log(req)
    res.json({name:'admin', pwd:'123'})
    //res.send()
})

module.exports = router;