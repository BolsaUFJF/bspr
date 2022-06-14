var express = require("express");
var router = express.Router();
const UserDatabase = require("../app/database/models/UserModel");
const CompanyDatabase = require("../app/database/models/CompanyModel");
const rede = require("../network.json")
const enrollAdmin = require('../app/transaction/enrollAdmin')
const scripts = require("../app/controller/scripts")

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("network/index", {
		css: "",
	});
});

router.get("/start/:networkName", async (req, res) => {
	const name = req.params.networkName;
	console.log(name);

	await scripts.startNetwork(name);

	if (name == "rede2") res.redirect("/network?msg=success");
	else res.redirect("/network?msg=error");
});

router.get('/stop/:networkName', async (req, res)=>{
	const name = req.params.networkName;
	console.log(name);

	await scripts.stopNetwork(name);

	UserDatabase.deleteMany({}, function (err) {
		if(err) console.log(err);
	});
	CompanyDatabase.deleteMany({}, function (err) {
		if(err) console.log(err);
	});

	// console.log(__dirname)
	if (name == "rede2") res.redirect("/network?msg=success");
	else res.redirect("/network?msg=error");
});

router.get("/listarRedes", function (req, res, next) {
	res.render("rede/listarRedes", {
		css: "",
	});
});

router.get("/result", function (req, res, next) {
	res.render("results/result", {
		css: "",
	});
});

router.get("/resultDelete", function (req, res, next) {
	res.render("results/resultDelete", {
		css: "",
	});
});

router.get("/enrollAdmin", async (req, res) => {
	resultado = 0;
	resultado2 = 0;

	// console.log(rede)

	if (rede.isOnline === true) {
		resultado = await enrollAdmin.enrollAdminOrg1(rede);
		resultado2 = await enrollAdmin.enrollAdminOrg2(rede);
	} else {
		console.log("Nenhuma rede iniciada!!!!");
		resultado = 3;
	}

	if (resultado == 1 && resultado2 == 1) {
		res.send(JSON.parse('{ "result":"success"}'));
		// res.redirect("/network?msg=success");
	} else if (resultado == 2) {
		res.send(JSON.parse('{ "result":"exists"}'));
		// res.redirect("/network?msg=exists");
	} else if (resultado == 3) {
		res.send(JSON.parse('{ "result":"error"}'));
		// res.redirect("/network?msg=error");
	}
});

module.exports = router;
