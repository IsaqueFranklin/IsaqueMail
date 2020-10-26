const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');
const handlebars = require('handlebars')
const hbs = require('nodemailer-express-handlebars');
const mongoose = require('mongoose')
require('../models/email')
const Email = mongoose.model('emails')


router.get('/emails', function (req, res) {
  res.render('envio/lista')
})

router.post('/enviar', function (req, res) {

  var erros = []

  if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
    erros.push({ texto: "Título inválido" })
  }
  if (!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null) {
    erros.push({ texto: "Conteudo inválido" })
  }
  if (!req.body.link || typeof req.body.link == undefined || req.body.link == null) {
    erros.push({ texto: "Link inválido" })
  }
  if (!req.body.semail || typeof req.body.semail == undefined || req.body.semail == null) {
    erros.push({ texto: "Email inválido" })
  }
  if (!req.body.envmail || typeof req.body.envmail == undefined || req.body.envmail == null) {
    erros.push({ texto: "Emails inválidos" })
  }
  else {

    const novoEmail = new Email({
      titulo: req.body.titulo,
      conteudo: req.body.conteudo,
      link: req.body.link,
      semail: req.body.semail,
      envmail: req.body.envmail,
      senha: req.body.senha
    })

    novoEmail.save()

    Email.find().lean()


    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: semail,
        pass: senha,
      }
    });


    const handlebarOptions = {
      viewEngine: {
        extName: '.hbs',
        partialsDir: './views/template',
        layoutsDir: './views/template',
        defaultLayout: 'inde.hbs',
      },
      viewPath: './views/template',
      extName: '.hbs',
    };

    transporter.use('compile', hbs(handlebarOptions));

    transporter.sendMail({
      from: semail,
      to: envmail,
      subject: titulo,
      text: conteudo,
      template: 'inde'
    }).then(message => {
      console.log(message);
    }).catch(err => {
      console.log(err);
    })
    res.redirect('/')
  }
})

module.exports = router
