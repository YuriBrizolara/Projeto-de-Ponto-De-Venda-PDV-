const knex = require('../conexão');
const send = require('../nodeMailerConfig');

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

            return res.status(200).json(pedidosEncontrados[0]);
        }
        if (cliente_id && isNaN(cliente_id)) {
            return res.status(400).json({ mensagem: 'Numero de id invalido!' });
        }
        const pedidoCliente = await knex('pedidos')
            .select('*')
            .where({ cliente_id });

        if (pedidoCliente.length === 0) {
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
        return res.status(200).json(pedidoEncontrado[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const cadastrarPedidos = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;
    let valor = 0;
    try {
        const novoPedido = await knex('pedidos')
            .insert({
                cliente_id,
                observacao,
                valor_total: valor,
            })
            .returning('*');
        for (let item of pedido_produtos) {
            const valorProduto = await knex('produtos')
                .select('*')
                .where('id', item.produto_id)
                .first();
            const novoProdutos = await knex('pedido_produtos')
                .insert({
                    pedido_id: novoPedido[0].id,
                    produto_id: item.produto_id,
                    quantidade_produto: item.quantidade_produto,
                    valor_produto: valorProduto.valor,
                })
                .returning('*');
            valor += valorProduto.valor * item.quantidade_produto;
        }
        const atualizarValor = await knex('pedidos')
            .where('id', novoPedido[0].id)
            .update({ valor_total: valor })
            .returning('*');
        const enviarEmail = await knex('clientes')
            .select('email')
            .where({ id: cliente_id })
            .first();
        const emailString = enviarEmail.email.toString();
        send(
            emailString,
            'Cadastro de pedido',
            'Seu pedido foi cadastrado com sucesso'
        );
        return res.status(201).json('Pedido cadastrado');
    } catch (error) {
        return res.status(400).json('Erro ao efetuar o cadastro do pedido');
        return res.status(400).json('Erro ao efetuar o cadastro do pedido');
    }
};

module.exports = {
    listarPedidos,
    cadastrarPedidos,
};
