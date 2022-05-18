const mongoose = require("mongoose");
const CompanySchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   pki: {
      type: String,
      required: true,
   },
});

module.exports = mongoose.model("CompanyDatabase", CompanySchema);
