const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const routes = require('./src/routes')

const app = express()

mongoose.connect('mongodb+srv://admin:admin@geopositionsystem.2pvoswo.mongodb.net/?retryWrites=true&w=majority', { // tudo padrao
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
},function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Mongo Db conectado com sucesso")
    }
})
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(routes)

 

app.listen(8000, function(){
    console.log("App Iniciando na porta 8000")
})