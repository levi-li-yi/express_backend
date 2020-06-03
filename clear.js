var cmd=process.platform=='win32'?'netstat -ano':'ps aux';
var exec = require('child_process').exec;

var port='3000';
let status = true;

const clear = function () {
  console.log('清理准备');
  return new Promise((resolve,reject) => {
    // return resolve(true)111
    exec(cmd, (err, stdout, stderr) => {
      if(err) return console.log(err);

      stdout.split('\n').filter((line) => {
        var p=line.trim().split(/\s+/);
        var address=p[1];

        if(address!==undefined){
          if(address.split(':')[1] === port) {
            status = false
            console.log(p);
            exec('taskkill /F /pid '+p[4], (err, stdout, stderr) => {
              if(err){
                console.log('清理失败');
                return reject(err)
              }
              console.log('清理完成');
              return resolve('success')
            });
          } else {
            return Promise.resolve()
          }
        }
      });
      // console.log(status);
      if (status) {
        status = true;
        return resolve(true);
      }
    });
  })
};


module.exports = clear;