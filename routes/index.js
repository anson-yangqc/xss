var express = require('express');
var router = express.Router();

var comments = {}
function html_encode(str){
  //编码的过程
  var s = ''
  if(str.length ==0 ){
    return''
  }
  s = str.replace(/&/g,'&gt;');
  s = s.replace(/</g,"&lt;")
  s = s.replace(/>/g,"&gt;")
  s = s.replace(/ /g,"&nbsp;") //空格
  s = s.replace(/\s/g,"&nbsp;") //空格
  s = s.replace(/\'/g,"&#39;") //单引号
  s = s.replace(/\"/g,"&#quot;") //双引号
  s = s.replace(/\n/g,"<br>") //换行符
  return s;
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.set('X-XSS-Protection',0)
  res.render('index', { title: 'Express0',xss:req.query.xss }); //反射型
  // res.render('index', { title: 'Express0',xss:sql() }); //存储型
});
router.get('/xxcomment', function(req, res, next) {//设置评论接口
  // req, 请求
  // res,响应
  // next，捕获错误
  console.log('req.query.comment',req.query)
  var str = `<p>sks <img src="null" alt="" onerror="alert(1)"/></p>`
  comments.v = html_encode(str) //req.query.comment是用户的原始输入评论内容
});
router.get('/getComment', function(req, res, next) {//拉取评论
  res.json({
    comment:comments.v
  })
});
module.exports = router;
