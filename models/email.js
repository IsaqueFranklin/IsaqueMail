const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Email = new Schema({
  titulo: {
    type: String,
    required: true
  },
  conteudo: {
    type: String,
    required: true
  },
  semail: {
    type: String,
    required: true
  },
  envmail: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  }
})


mongoose.model('emails', Email)
