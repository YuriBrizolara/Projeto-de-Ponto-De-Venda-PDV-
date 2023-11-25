const express= require('express');
const listarCategorias = require('../controladores/categorias');
const { cadastrarUsuario, editarUsuario, detalharUsuario } = require('../controladores/usuarios');
const efetuarLogin = require('../controladores/login');
const {validarDadosCorpo, validacaoGenerica, verificarToken} = require('../intermediarios/intermediariosUsuarios');
const schemaUsuario = require('../validacoes/schemaUsuario');

const rotas = express.Router();
rotas.get('/categoria',listarCategorias);
rotas.post('/usuario',validarDadosCorpo(schemaUsuario), cadastrarUsuario);
rotas.post('/login',validacaoGenerica(['email','senha']),efetuarLogin);
rotas.use(verificarToken);
rotas.put('/usuario',editarUsuario);
rotas.get('/usuario',detalharUsuario);


module.exports= rotas
