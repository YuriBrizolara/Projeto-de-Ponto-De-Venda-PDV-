const knex = require('../conexão');

const encontrarProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoEncontrado = await knex('produtos')
            .where({ id })
            .first()
            .returning('*');
        if (!produtoEncontrado) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        return produtoEncontrado;
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message,
        });
    }
};

module.exports = { encontrarProduto };
