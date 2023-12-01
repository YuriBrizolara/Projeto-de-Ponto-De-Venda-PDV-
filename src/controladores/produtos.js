const knex = require('../conexão');

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

module.exports = { excluirProduto };
