require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/bspr", {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err)=>{
    console.log(err)
})

db.once('open', ()=>{
    console.log('Database bspr connected')
})

app.use(express.json())


module.exports = mongoose