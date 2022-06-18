var express = require('express');
var router = express.Router();
//Connection to database
const mongodb = require('../controllers/mongodb/Server'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  // temp.provenanceToBlockchain();
  res.render('index',{
    css: ''
  });
});

router.get('/cadastrarRede', function(req, res, next) {
  res.render('rede/cadastrarRede',{
    css: ''
  });
});

router.get('/listarRedes', function(req, res, next) {
  res.render('rede/listarRedes',{
    css: ''
  });
});

router.get('/result', function(req, res, next) {
  res.render('results/result',{
    css: ''
  });
});

router.get('/resultDelete', function(req, res, next) {
  res.render('results/resultDelete',{
    css: ''
  });
});


module.exports = router;
