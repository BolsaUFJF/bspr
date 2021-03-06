var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//------Modulos instalados para o Front-End
app.use(express.static(__dirname + '/node_modules/axios/dist'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/popper.js/dist'));
app.use(express.static(__dirname + '/node_modules/toastr/build'));
app.use(express.static(__dirname + '/node_modules/moment/min'));
//------END


//------Arquivos de rotas
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var proArticleRouter = require('./routes/proArticle');
var companyRouter = require('./routes/company');
var networkRouter = require('./routes/network');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/pro_article', proArticleRouter);
app.use('/company', companyRouter);
app.use('/network', networkRouter);
//------END

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
