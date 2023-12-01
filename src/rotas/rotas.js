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
const {
    excluirProduto,
    listarProdutos,
    detalharProduto,
} = require('../controladores/produtos');
const schemaCliente = require('../validacoes/schemaCliente');
const { editarCliente, listarClientes, detalharCliente } = require('../controladores/clientes');

const rotas = express.Router();
rotas.get('/categoria', listarCategorias);
rotas.post('/usuario', validarDados(schemaCadastroUsuario), cadastrarUsuario);
rotas.post('/login', validarDados(schemaLogin), efetuarLogin);
rotas.use(verificarToken);
rotas.put('/usuario', validarDados(schemaCadastroUsuario), editarUsuario);
rotas.get('/usuario', detalharUsuario);
rotas.get('/produto', listarProdutos);
rotas.get('/produto/:id', detalharProduto);
rotas.delete('/produto/:id', excluirProduto);
rotas.put('/cliente/:id', validarDados(schemaCliente), editarCliente);
rotas.get('/cliente',listarClientes);
rotas.get('/cliente/:id',detalharCliente);

module.exports = rotas;
