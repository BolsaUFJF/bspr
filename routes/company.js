const { response } = require("express");
const express = require("express");
const router = express.Router();

const CompanyDatabase = require("../app/database/models/CompanyModel");

router.get("/", (req, res) => {
	res.render("company/index", {
		css: "",
	});
});

router.get("/new", (req, res) => {
	res.render("company/cadastrar", {
		css: "",
	});
});

router.post("/save", async (req, res) => {
	const { nome, descricao, permissao, pki } = req.body;
	console.log(req.body)

	// const userDatabase = new UserDatabase({
	// 	nome: nome,
	// 	descricao: descricao,
	// 	permissao: permissao,
	// 	pki: pki
	// });

	// await userDatabase.save();
	// createProvData.registerAgent(nome, pki, "user")
	res.redirect("/company/get");
});

router.get("/get", (req, res) => {
	res.render("company/listar", {
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
