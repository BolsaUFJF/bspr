const axios = require("axios");
require("dotenv").config();

// const integrate = require('./integrate').getBaseRoute();

// const baseURL = "https://api-provenance.herokuapp.com";
const baseURL = "http://localhost:3333";
// const baseURL = process.env.URL_API;

const DocumentDatabase = require("../database/models/DocumentModel");

async function getEntityByName(name) {
  var document = await DocumentDatabase.findOne({ name: name });

  const result = await axios.get(
    baseURL + `/entity/get-by-name/${document.name}`
  );

  return result.data.n;
}

async function getAllData() {
  const result = await axios.get(baseURL + "/get-all");
  return result.data;
}

module.exports = {
  getEntityByName,
  getAllData,
};
