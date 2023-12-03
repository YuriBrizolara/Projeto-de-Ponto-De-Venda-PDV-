const express = require('express');

const listarCategorias = require('../controladores/categorias');

const {
    cadastrarUsuario,
    editarUsuario,
    detalharUsuario,
} = require('../controladores/usuarios');

const efetuarLogin = require('../controladores/login');

const {
    excluirProduto,
    listarProdutos,
    detalharProduto,
    cadastrarProduto,
    editarProduto,
} = require('../controladores/produtos');

const {
    editarCliente,
    listarClientes,
    detalharCliente,
    cadastrarCliente,
} = require('../controladores/clientes');

const schemaCadastroUsuario = require('../validacoes/schemaCadastroUsuario');
const schemaLogin = require('../validacoes/schemaLogin');
const schemaCliente = require('../validacoes/schemaCliente');
const schemaProduto = require('../validacoes/schemaProduto');
const { validarDados, verificarToken} = require('../intermediarios/validacao');

const rotas = express.Router();

rotas.get('/categoria', listarCategorias);
rotas.post('/usuario', validarDados(schemaCadastroUsuario), cadastrarUsuario);
rotas.post('/login', validarDados(schemaLogin), efetuarLogin);

rotas.use(verificarToken);

rotas.put('/usuario', validarDados(schemaCadastroUsuario), editarUsuario);
rotas.put('/cliente/:id', validarDados(schemaCliente), editarCliente);
rotas.put('/produto/:id', validarDados(schemaProduto), editarProduto);

rotas.get('/usuario', detalharUsuario);
rotas.get('/produto', listarProdutos);
rotas.get('/produto/:id', detalharProduto);
rotas.get('/cliente', listarClientes);
rotas.get('/cliente/:id', detalharCliente);

rotas.post('/produto', validarDados(schemaProduto), cadastrarProduto);
rotas.post('/cliente', validarDados(schemaCliente), cadastrarCliente);

rotas.delete('/produto/:id', excluirProduto);

module.exports = rotas;
