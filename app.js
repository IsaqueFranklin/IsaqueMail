//Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const app = express()
const envio = require('./routes/envio')
const mongoose = require('mongoose')

//Configuração

app.use(session({
  secret: 'charuto',
  resave: true,
  saveUninitialized: true
}))

app.use(flash())

//Middleware

app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})

//bodyParser

app.use(bodyParser.urlencoded({extend: true}))
app.use(bodyParser.json())

//Handlebars

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

//Public CSS and front-end JS

app.use('/public', express.static(path.join(__dirname, 'public')))

//Mongoose

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/lojinha").then(function(){
  console.log('Conectado ao mongo.')
}).catch(function(err){
  console.log('Erro ao se conectar com o mongo: '+err)
})

//Rotas

app.use('/envio', envio)

app.get('/', function(req, res){
  res.render('index')
})

//Iniciando o servidor

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  console.log('Servidor rodando!')
})
