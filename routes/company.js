const express = require("express");
const router = express.Router();
const rede = require("../network.json");
const CompanyDatabase = require("../models/CompanyModel");
const registerUser = require("../controllers/transaction/registerUserOrg");

router.get("/", (req, res) => {
	res.render("userOrg2/index", {
		css: "",
	});
});

router.get("/new", (req, res) => {
	res.render("userOrg2/cadastrar", {
		css: "",
	});
});

router.post("/save", async (req, res) => {
	const { nome, descricao, permissao, pki } = req.body;

	// Efetua cadastro do usuário na blockchain
	if(rede.isOnline === true) {
		result = await registerUser.registerUserOrg2(pki, rede);
	} else {
		console.log("Nenhuma rede iniciada!!!!");
		result = 3;
	}
	
	if(result != 1) {
		res.redirect('/user/get');
	} else if (result === 1) {
		const companyDatabase = new CompanyDatabase({
			nome: nome,
			descricao: descricao,
			permissao: permissao,
			pki: pki
		});
		await companyDatabase.save();
		res.redirect("/company/get");
	}
});

router.get("/get", (req, res) => {
	res.render("userOrg2/listar", {
		css: "",
	});
});

router.get("/getUsers", async (req, res) => {
	res.send(await CompanyDatabase.find());
});

router.post('/delete', async (req, res) => {
	userId = req.body.userId;
	// const query = {_id: userId}
	// UserDatabase.deleteOne(query, function (err) {
	// 	if(err) res.redirect('/resultDelete?msg=error');
	// 	res.redirect('/resultDelete?msg=success');   
	// });
});



module.exports = router;
