const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        min: 00000000000,
        max: 99999999999,
        required: true
    },
    idade: {
        type: Number,
        min: 0,
        max: 120,
        required: true
    },
    telefone: {
        type: Number,
    },
    cargo: {
        type: String,
        required: true
    },
    descricao:{
        type: String,
    },
    permissao:{
        type: Number,
        required: true
    },
    pki:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserDatabase', UserSchema)