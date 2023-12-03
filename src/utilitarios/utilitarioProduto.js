const encontrarProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoEncontrado = await knex('produtos')
            .select('*')
            .where('id', id)
            .first();
        if (!produtoEncontrado) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message,
        });
    }
};

module.exports = { encontrarProduto };
