/**
 * Created by Administrator on 2017/5/12 0012.
 */
//读取配置，生成配置文件
var fs=require('fs')
var glob=require('glob')
var thunkify=require('thunkify')
var tampArr=glob.sync(__dirname+'/../data/?(tags|service)/*.json')
var tags = [], services = [], config = {}
function run(fn) {
  var gen = fn();
  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }
  next();
}

module.exports=function () {
  run(function *() {
    let file = __dirname + '/../data/config.json'
    let res = yield thunkify(fs.readFile)(file, 'utf8');
    config = JSON.parse(res);
    for(i in tampArr){
      res = yield thunkify(fs.readFile)(tampArr[i], 'utf8');
      if(tampArr[i].indexOf('tags')>=0){
        tags.push(JSON.parse(res));
      }else if(tampArr[i].indexOf('service')>=0){
        services.push(JSON.parse(res));
      }
      config.tags = tags;
      config.services = services;
    }
    //
    fs.writeFile(file,JSON.stringify(config,function (key,value) {
      return value;
    },2),function (err,res) {
      console.log('ok');
    })
  });
}
