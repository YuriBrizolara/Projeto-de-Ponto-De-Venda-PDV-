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
            .where('categoria_id', categoria_id);

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
        const produtoEncontrado = await encontrarProduto(req);
        return res.status(200).json(produtoEncontrado);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const excluirProduto = async (req, res) => {
    const { id } = req.params;
    try {
        const encontrarProduto = await knex('produtos')
            .select('*')
            .where('id', id)
            .first();
        if (!encontrarProduto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        const excluirDoBanco = await knex('produtos').delete().where('id', id);
        return res
            .status(200)
            .json({ mensagem: 'Produto excluido com sucesso' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    try {
        const novoProduto = await knex('produtos')
            .insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
            })
            .returning('*');

        return res.status(201).json();
    } catch (error) {
        return res.status(400).json('Erro ao efetuar o cadastro do Produto');
    }
};

module.exports = {
    listarProdutos,
    detalharProduto,
    excluirProduto,
    cadastrarProduto,
};
