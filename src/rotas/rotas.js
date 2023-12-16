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

const { listarPedidos, cadastrarPedidos } = require('../controladores/pedidos');

const schemaCadastroUsuario = require('../validacoes/schemaCadastroUsuario');
const schemaLogin = require('../validacoes/schemaLogin');
const schemaCliente = require('../validacoes/schemaCliente');
const schemaProduto = require('../validacoes/schemaProduto');
const schemaPedido = require('../validacoes/schemaPedido');
const {
    validarCorpo,
    verificarToken,
} = require('../intermediarios/validarCorpo');
const validarParametroDeRota = require('../intermediarios/validarParametrosRota');

const multer = require('../intermediarios/multer');
const validarCpf_Email = require('../intermediarios/validarCpf');
const validarCategoria = require('../intermediarios/validarCategoria');
const validarPedido = require('../intermediarios/validarPedido');

const rotas = express.Router();

rotas.post('/usuario', validarCorpo(schemaCadastroUsuario), cadastrarUsuario);
rotas.post('/login', validarCorpo(schemaLogin), efetuarLogin);
rotas.get('/categoria', listarCategorias);

rotas.use(verificarToken);

rotas.put(
    '/usuario',
    validarCorpo(schemaCadastroUsuario),
    validarCpf_Email,
    editarUsuario
);
rotas.get('/usuario', detalharUsuario);

rotas.put(
    '/cliente/:id',
    validarParametroDeRota('clientes'),
    validarCorpo(schemaCliente),
    validarCpf_Email,
    editarCliente
);
rotas.get('/cliente', listarClientes);
rotas.get('/cliente/:id', validarParametroDeRota('clientes'), detalharCliente);
rotas.post(
    '/cliente',
    validarCorpo(schemaCliente),
    validarCpf_Email,
    cadastrarCliente
);

rotas.put(
    '/produto/:id',
    multer.single('produto_imagem'),
    validarParametroDeRota('produtos'),
    validarCorpo(schemaProduto),
    validarCategoria,
    editarProduto
);
rotas.get('/produto/:id', validarParametroDeRota('produtos'), detalharProduto);
rotas.get('/produto', listarProdutos);
rotas.post(
    '/produto',
    multer.single('produto_imagem'),
    validarCorpo(schemaProduto),
    validarCategoria,
    cadastrarProduto
);
rotas.delete(
    '/produto/:id',
    validarParametroDeRota('produtos'),
    excluirProduto
);

rotas.get('/pedido', listarPedidos);
rotas.post(
    '/pedido',
    validarCorpo(schemaPedido, { debug: true }),
    validarPedido,
    cadastrarPedidos
);

module.exports = rotas;
