const knex = require('../conexão');

const encontrarProduto = async (req, res) => {
    const { idProduto } = req.params;

    try {
        const produtoEncontrado = await knex('produtos')
            .where('id', idProduto)
            .first();
        if (!produtoEncontrado) {
            return res.status(404).json({ mensagem: 'Produto não encontrado quebrou' });
        }
        req.produto = produtoEncontrado;

        return produtoEncontrado;

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro interno do servidor'
        });
    }
};

module.exports = { encontrarProduto };
