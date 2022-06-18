const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const atob = require("atob");
var base64 = require('file-base64');

const multerConfig = require('../controllers/config/multer')
const invoke = require('../controllers/transaction/invoke')
const query = require('../controllers/transaction/query')

// const RedeDatabase = require('../app/database/models/RedeModel')
const UserDatabase = require('../models/UserModel')
const CompanyDatabase = require('../models/CompanyModel')
const DocumentDatabase = require('../models/DocumentModel')

const relationship = require('../controllers/integrateApi/relationships');
const provenanceData = require('../controllers/integrateApi/provenanceData');

const rede = require("../network.json")

function parseJwt(token) {
   var base64Url = token.split('.')[1];
   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));

   return JSON.parse(jsonPayload);
};

const fileToBase64 = (filename, filepath) => {
   return new Promise(resolve => {
      var file = new File([filename], filepath);
      var reader = new FileReader();
      // Read file content on file loaded event
      reader.onload = function (event) {
         resolve(event.target.result);
      };

      // Convert data to base64 
      reader.readAsDataURL(file);
   });
};

router.get('/', (req, res) => {
   res.render('proArticle/index', {
      css: ''
   });
});

router.get('/uploadFile', function (req, res) {
   res.render('proArticle/upload', {
      css: ''
   });
});

router.get('/new', function (req, res) {
   res.render('proArticle/cadastrar', {
      css: ''
   });
});

router.get('/get', function (req, res) {
   res.render('proArticle/listar', {
      css: ''
   });
});

router.get('/getDocInfo', async (req, res) => {
   const start = new Date().getTime()

   var { value, selectedValue, userKey, userName, workFor } = req.query
   const val = req.query.value


   const configTemp = require('../template/docData/docs.json');

   const config = {
      title: val,
      data: configTemp[val]
   }

   const end = new Date().getTime()

   console.log(configTemp[val])
   res.send(config);
});

router.get('/convertBase', async (req, res) => {
   const val = req.query.value

   const configTemp = require('../template/docData/docs.json');

   const config = {
      title: val,
      base: configTemp[val]["base64"]
   }

   res.send(config);
});

router.get('/getDocs', async (req, res) => {
   const json_data = require('../template/docData/docs.json');

   var result = [];
   var x = 0;
   for (var i in json_data) {
      result.push([i, json_data[i]]);
      x++;
   }
   res.send(result);
});

router.post('/save', async (req, res) => {
   const { userPki, companyOrigin, companyDestination, documetName } = req.body;
   const transactionID = "Block:" + uuidv4();
   const provenanceID = uuidv4();
   const timestamp = Date.now();


   const requisition = "Send Document"

   var resultCompanyOrigin = await UserDatabase.findOne({ pki: companyOrigin })
   var resultCompanyDestination = await CompanyDatabase.findOne({ pki: companyDestination })
   var document = await provenanceData.getEntityByName(documetName);

   if (resultCompanyDestination === null) {
      const status = "Company Destination not find"

      const activitySendDocument = {
         "name": "Send Document ",
         "provType": "send-document",
         "start_time": 0,
         "end_time": 0
      }

      const entity = {
         "name": "Error#" + uuidv4(),
         "provType": "error",
         "data": {
            "status": status,
            "code": "0x0001d",
            "message": "Company " + companyOrigin + " not find"
         }
      }
      console.log(status)
      await relationship.wasGeneratedBy(entity, activitySendDocument, companyOrigin);

      res.redirect('/pro_article?msg=compdestinationerror');

   } else {
      var antes = Date.now(); // Start Time

      if(rede.isOnline === true) {
         var resultTransaction = await invoke.saveProArticle(transactionID, companyOrigin, companyDestination, JSON.stringify(document), requisition, rede);
      } else {
         console.log("Nenhuma rede iniciada!!!!");
         resultTransaction = 3;
      }

      var depois = Date.now()
      var duracao = depois - antes; // End Time
      console.log("levou " + duracao + "ms");

      if( resultTransaction == 1) {
         var entity = document;

         const agent = {
            "name": resultCompanyOrigin.nome,
            "provType": "agent-user",
            "data": {
               "pki": resultCompanyOrigin.pki,
               "network": resultCompanyOrigin.network
            }
         }

         const activitySendDocument = {
            "name": "Send Document#" + uuidv4(),
            "provType": "send-document",
            "start_time": antes.toString(),
            "end_time": depois.toString()
         }

         entity.data = parseJwt(entity.data);

         await relationship.wasAssociatedWith(activitySendDocument, agent, companyOrigin)
         await relationship.used(activitySendDocument, entity, companyOrigin)

      } else if(resultTransaction == 2) {
         const status = "invalid user"

         const activitySendDocument = {
            "name": "Send Document ",
            "provType": "send-document",
            "start_time": 0,
            "end_time": 0
         }
   
         const entity = {
            "name": "Error#" + uuidv4(),
            "provType": "error",
            "data": {
               "status": status,
               "code": "0x0001f",
               "message": "Invalid User"
            }
         }
         console.log(status)
         await relationship.wasGeneratedBy(entity, activitySendDocument, companyOrigin);

         res.redirect('/pro_article?msg=usererror');

      } else if(resultTransaction == 3) {
         const status = "internal error"
         const activitySendDocument = {
            "name": "Send Document ",
            "provType": "send-document",
            "start_time": 0,
            "end_time": 0
         }
   
         const entity = {
            "name": "Error#" + uuidv4(),
            "provType": "error",
            "data": {
               "status": status,
               "code": "0x0001c",
               "message": "Internal Error"
            }
         }
         console.log(status)
         await relationship.wasGeneratedBy(entity, activitySendDocument, companyOrigin);
         
         res.redirect('/pro_article?msg=internalerror');
      }

      const query = {name: documetName}
      DocumentDatabase.deleteOne(query, function (err) {
         // if (err) res.redirect('/resultDelete?msg=error');
         // res.redirect('/resultDelete?msg=success');
         if(err) console.log(err);
         console.log("Success");
      });

      res.redirect('/pro_article?msg=success');
   }
});

router.post('/uploadData', multer(multerConfig).single('file'), async (req, res) => {
   const start = new Date().getTime()
   var user = await UserDatabase.findOne({ pki: req.body.userPki })

   const activityCreateDocument = {
      "name": "Create Document ",
      "provType": "create-document",
      "start_time": start.toString(),
      "end_time": (start + req.file.size).toString()
   }
   const entityDocumentData = {
      "name": "Document Data " + req.file.originalname,
      "provType": "document-data",
      "data": {
         "filename": req.file.filename,
         "format": req.file.mimetype,
         "path": req.file.path,
         "title": req.file.selectedValue,
         "size": req.file.size
      }
   }

   const agent = {
      "name": user.nome,
      "provType": "agent-user",
      "data": {
         "pki": user.pki,
         "network": user.network
      }
   }

   await relationship.wasGeneratedBy(entityDocumentData, activityCreateDocument), user.pki;
   await relationship.wasAssociatedWith(activityCreateDocument, agent, user.pki);

   const startConversion = new Date().getTime();
   const base64Data = await new Promise((resolve, reject) => {
      base64.encode(req.file.path, function (err, base64String) {
         if (err) throw Error("Failed conversion")
         else {
            resolve(base64String);
         }
      });
   })
   const endConversion = new Date().getTime();

   activityConvertBase = {
      "name": "Convert Document " + req.file.originalname,
      "provType": "convert-document",
      "start_time": startConversion,
      "end_time": endConversion
   }

   entityDocumentBase = {
      "name": "Base 64 - " + req.file.originalname,
      "provType": "document-base",
      "data": {
         "base": base64Data,
         "mime": req.file.mimetype
      }
   }

   await relationship.wasInformedBy(activityConvertBase, activityCreateDocument, user.pki);
   await relationship.used(activityConvertBase, entityDocumentData, user.pki);
   await relationship.wasGeneratedBy(entityDocumentBase, activityConvertBase, user.pki);
   await relationship.wasDerivedFrom(entityDocumentBase, entityDocumentData, user.pki);


   var documentDataVerify = await DocumentDatabase.findOne({ name: entityDocumentBase.name })

   if (documentDataVerify == null) {
      const documentDatabase = new DocumentDatabase({
         name: entityDocumentBase.name,
         base64: entityDocumentBase.data.base,
         provType: entityDocumentBase.provType
      })
      documentDatabase.save()
   }



   console.log("ok");
   res.redirect('/pro_article?msg=uploadsuccess');
})

router.get("/getDocuments", async (req, res) => {
   res.send(await DocumentDatabase.find());
});

router.get('/getTransactions', async (req, res) => {
   var data = await query.getAllData("r01", rede);
   var blockData = [];
   var provData = [];

   const jsonData = JSON.parse(data);

   jsonData.forEach(element => {
      if(element.Key.includes("Block")) {
         element.Record.document = JSON.parse(element.Record.document);
         blockData.push(element);
      } else if(element.Key.includes("Prov")) {
         provData.push(element);
      }
   });

   console.log(blockData[0]);

   res.send(blockData);
})

module.exports = router;