const { S3 } = require('aws-sdk');
const knex = require('../conexão');
const { encontrarProduto } = require('../utilitarios/utilitarioProduto');
const { uploadArquivo, excluirArquivo } = require('../utilitarios/s3');

const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query;

    try {
        if (!categoria_id) {
            const todosProdutos = await knex('produtos').select('*');
            return res.status(200).json(todosProdutos);
        }

        const categoriaExistente = await knex('categorias')
            .select('id')
            .where('id', categoria_id);

        if (categoriaExistente.length === 0) {
            return res
                .status(404)
                .json({ mensagem: 'Categoria não encontrada' });
        }

        const produtoCategoria = await knex('produtos')
            .select('*')
            .where({ categoria_id });

        if (produtoCategoria.length === 0) {
            return res.status(404).json({
                mensagem:
                    'Nenhum produto encontrado para a categoria especificada',
            });
        }

        return res.status(200).json(produtoCategoria);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const detalharProduto = async (req, res) => {
    try {
        const produtoEncontrado = await encontrarProduto(req, res);
        return res.status(200).json(produtoEncontrado);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoVinculadoPedido = await knex('pedido_produtos')
            .select('*')
            .where('produto_id', id)
            .first();

        if (produtoVinculadoPedido) {
            return res.status(404).json({
                mensagem: 'Produto não pode estar vinculado a um pedido',
            });
        }
        const informacaoDoProduto = await encontrarProduto(req, res);
        if (informacaoDoProduto.produto_imagem) {
            const urlManipulada = informacaoDoProduto.produto_imagem.split('/');
            const nomeDoArquivo = urlManipulada[urlManipulada.length - 1];

            const excluirImagemBucket = await excluirArquivo(nomeDoArquivo);
        }

        const excluirDoBanco = await knex('produtos')
            .delete()
            .where('id', id)
            .returning('*');

        if (excluirDoBanco.length > 0) {
            return res
                .status(200)
                .json({ mensagem: 'Produto excluido com sucesso' });
        }
    } catch (error) {
        return res.status(500).json(error.message);
        // return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const arquivo = req.file;

    try {
        const produto_imagem = await uploadArquivo(
            arquivo.originalname,
            arquivo.buffer,
            arquivo.mimetype
        );
        const adicionarProduto = await knex('produtos')
            .insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem,
            })
            .returning('*');

        return res.status(201).json(adicionarProduto[0]);
    } catch (error) {
        return res.status(400).json('Erro ao efetuar o cadastro do Produto');
    }
};

const editarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const arquivo = req.file;
    try {
        await encontrarProduto(req, res);
        const produto_imagem = await uploadArquivo(
            arquivo.originalname,
            arquivo.buffer,
            arquivo.mimetype
        );

        const produtoAtualizado = await knex('produtos')
            .where({ id })
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem,
            })
            .returning('*');

        return res.status(200).json(produtoAtualizado[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    listarProdutos,
    detalharProduto,
    excluirProduto,
    cadastrarProduto,
    editarProduto,
};
