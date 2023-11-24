const express= require('express');
const listarCategorias = require('../controladores/categorias');
const { cadastrarUsuario, editarUsuario, detalharUsuario } = require('../controladores/usuarios');
const efetuarLogin = require('../controladores/login');
const validarDadosCorpo = require('../intermediarios/intermediariosUsuarios');
const schemaUsuario = require('../validacoes/schemaUsuario');

const rotas = express();

rotas.post('/login',efetuarLogin);

rotas.post('/usuario',validarDadosCorpo(schemaUsuario), cadastrarUsuario);
rotas.put('/usuario',editarUsuario);
rotas.get('/usuario',detalharUsuario);

rotas.get('/categoria',listarCategorias);

module.exports= rotas
