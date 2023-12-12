const knex = require('../conexão');

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query;
    try {

        if (!cliente_id) {
            const todosPedidos = await knex('pedidos').select('*');
            const pedidosEncontrados = await Promise.all(
                todosPedidos.map(async (pedido) => {
                    const pedido_produtos = await knex('pedido_produtos')
                        .select('*')
                        .where({ pedido_id: pedido.id });

                    return {
                        pedido,
                        pedido_produtos,
                    };
                })
            );

            return res.status(200).json(pedidosEncontrados);
        }
        const pedidoCliente = await knex('pedidos')
            .select('*')
            .where({ cliente_id });

        if (!pedidoCliente) {
            return res.status(404).json({
                mensagem:
                    'Nenhum pedido encontrado para o cliente especificado',
            });
        }
        const pedido = pedidoCliente[0];

        const pedido_produtos = await knex('pedido_produtos')
            .select('*')
            .where({ pedido_id: pedido.id });

        const pedidoEncontrado = [
            {
                pedido,
                pedido_produtos,
            },
        ];
        return res.status(200).json(pedidoEncontrado);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const cadastrarPedidos = async (req, res) => {

}


module.exports = {
    listarPedidos,
    cadastrarPedidos
};
