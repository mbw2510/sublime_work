var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓요기부터 마이플레이스

// get 방식 test06 "/ajax/test06" 아이디 형식 요청처리
app.get("/ajax/test06ID", function(req, res){
  //전송된 파라미터 추출
  //아이디를 검증할 정규 표현식 
  var reg1 = /^[a-z][a-zA-Z0-9]{4,9}$/;
  //이메일을 검증할 정규 표현식
  var id = req.query.inputId; //입력한 아이디

  if(reg1.test(id)){
  res.json({canUse:true});  
  }else{
  res.json({canUse:false});
  }
})

// get 방식 test06 "/ajax/test06" 이메일 형식 요청처리
app.get("/ajax/test06EMAIL", function(req, res){
  //전송된 파라미터 추출
  //이메일을 검증할 정규 표현식
  var reg2 = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  var email = req.query.inputEmail; //입력한 아이디

  if(reg2.test(email)){
  res.json({canUse:true});  
  }else{
  res.json({canUse:false});
  }
})

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑요기까지

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
