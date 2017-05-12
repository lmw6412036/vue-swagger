/**
 * Created by Administrator on 2017/5/12 0012.
 */
//读取配置，生成配置文件
var fs=require('fs')
var glob=require('glob')
var thunkify=require('thunkify')
var tampArr=glob.sync(__dirname+'/../data/?(tags|service)/*.json')
var tags=[],services=[]
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
    for(i in tampArr){
      var res=yield thunkify(fs.readFile)(tampArr[i],'utf8');
      if(tampArr[i].indexOf('tags')>=0){
        tags.push(res);
      }else if(tampArr[i].indexOf('service')>=0){
        services.push(res);
      }
    }
    console.log(tags,services);
  });
}
