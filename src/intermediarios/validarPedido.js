const knex = require('../conexão');
const validarPedido = async (req, res, next) => {
    const { cliente_id, pedido_produtos } = req.body;
    try {
        if (cliente_id) {
            const idExiste = await knex('clientes')
                .where({ id: cliente_id })
                .first();

            if (!idExiste) {
                return res
                    .status(400)
                    .json({ mensagem: 'O Cliente informado não existe' });
            }
        }
        for (let item of pedido_produtos) {
            const idProdutoExiste = await knex('produtos')
                .where({ id: item.produto_id })
                .first();
            if (!idProdutoExiste) {
                return res
                    .status(400)
                    .json({ mensagem: 'O Produto informado não existe' });
            }
            if (idProdutoExiste.quantidade_estoque < item.quantidade_produto) {
                return res
                    .status(400)
                    .json({
                        mensagem:
                            'O Produto informado não possui estoque suficiente para atender o pedido'
                    });
            }
        }
        next();
    } catch (error) {
        return res.status(400).json({
            mensagem: 'Erro interno do servidor',
        });
    }
};
module.exports = validarPedido;
