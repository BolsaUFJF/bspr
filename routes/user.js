const { response } = require("express");
const express = require("express");
const router = express.Router();

const UserDatabase = require("../app/database/models/UserModel");
// const registerUser = require("../app/transaction/registerUser");
// const RedeDatabase = require("../app/database/models/RedeModel");

router.get("/", (req, res) => {
	res.render("user/index", {
		css: "",
	});
});

router.get("/new", (req, res) => {
	res.render("user/cadastrar", {
		css: "",
	});
});

router.post("/save", async (req, res) => {
	const { nome, descricao, permissao, pki } = req.body;
	console.log(req.body)

	const userDatabase = new UserDatabase({
		nome: nome,
		descricao: descricao,
		permissao: permissao,
		pki: pki
	});

	await userDatabase.save();
	// createProvData.registerAgent(nome, pki, "user")
	res.redirect("/user/get");
});

router.get("/get", (req, res) => {
	res.render("user/listar", {
		css: "",
	});
});

router.get("/getUsers", async (req, res) => {
	res.send(await UserDatabase.find());
});

router.post('/delete', async (req, res) => {
	userId = req.body.userId;
	const query = {_id: userId}
	UserDatabase.deleteOne(query, function (err) {
		if(err) res.redirect('/resultDelete?msg=error');
		res.redirect('/resultDelete?msg=success');   
	});
});



module.exports = router;
