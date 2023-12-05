const knex = require('../conexão');
const { encontrarProduto } = require('../utilitarios/utilitarioProduto');

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
        await encontrarProduto(req, res);

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
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    try {
        const adicionarProduto = await knex('produtos')
            .insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
            })
            .returning('*');

        return res.status(201).json(adicionarProduto);
    } catch (error) {
        return res.status(400).json('Erro ao efetuar o cadastro do Produto');
    }
};

const editarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        await encontrarProduto(req, res);

        const produtoAtualizado = await knex('produtos')
            .where({ id })
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
            })
            .returning('*');

        return res.status(200).json({ produtoAtualizado });
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
