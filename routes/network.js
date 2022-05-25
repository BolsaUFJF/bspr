var express = require('express');
var router = express.Router();
const mongodb = require('../app/database/mongodb/Server')

const path = require('path');
const shell = require('shelljs');


const integrateApi = require('../app/integrateApi/relationships')

// const temp = require('../app/integrateApi/provToBlockchain')

/* GET home page. */
router.get('/', function(req, res, next) {
  // temp.provenanceToBlockchain();
  res.render('network/index',{
    css: ''
  });
});

router.post('/start', async (req, res)=>{
  // console.log(req);
  const name = req.body.networkName;
  console.log(name);
  const networks = path.resolve('networks', 'rede2', 'chaincode');
  console.log(networks);
  // const pathNetworks = networks + '/' + rededatabase.nomeRede;

  shell.cd(networks);
  shell.exec('./startFabric.sh javascript');
  shell.cd(__dirname);
  shell.cd('..');
  // console.log(__dirname)
  // if(name == "rede") res.redirect('/network?msg=success');
  // else res.redirect('/network?msg=error');
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
