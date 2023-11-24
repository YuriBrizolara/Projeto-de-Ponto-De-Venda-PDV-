const express= require('express');
const listarCategorias = require('../controladores/categorias');
const { cadastrarUsuario, editarUsuario, detalharUsuario } = require('../controladores/usuarios');
const efetuarLogin = require('../controladores/login');
const rotas = express();
rotas.post('/usuario',cadastrarUsuario);
rotas.put('/usuario',editarUsuario);
rotas.post('/login',efetuarLogin);
rotas.get('/usuario',detalharUsuario);
rotas.get('/categoria',listarCategorias);
module.exports= rotas
