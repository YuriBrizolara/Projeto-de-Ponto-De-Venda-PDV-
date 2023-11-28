const express = require('express');
const listarCategorias = require('../controladores/categorias');
const {
    cadastrarUsuario,
    editarUsuario,
    detalharUsuario,
} = require('../controladores/usuarios');
const efetuarLogin = require('../controladores/login');
const {
    validarDados,
    verificarToken,
} = require('../intermediarios/intermediariosUsuarios');
const schemaCadastroUsuario = require('../validacoes/schemaCadastroUsuario');
const schemaLogin = require('../validacoes/schemaLogin');

const rotas = express.Router();
rotas.get('/categoria', listarCategorias);
rotas.post('/usuario', validarDados(schemaCadastroUsuario), cadastrarUsuario);
rotas.post('/login', validarDados(schemaLogin), efetuarLogin);
rotas.use(verificarToken);
rotas.put('/usuario', validarDados(schemaCadastroUsuario), editarUsuario);
rotas.get('/usuario', detalharUsuario);

module.exports = rotas;
