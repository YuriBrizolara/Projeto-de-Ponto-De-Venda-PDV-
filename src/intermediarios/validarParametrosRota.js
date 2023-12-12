const validarParametroDeRota = (rota) => async (req, res, next) => {
    const { id } = req.params;
    try {
        if (id === undefined || isNaN(Number(id))) {
            return res.status(400).json({
                mensagem: 'Insira um numero de ID valido!',
            });
        }
        if (rota === 'cliente') {
            const idClienteExiste = await knex('clientes')
                .where({ id })
                .first();

            if (!idClienteExiste) {
                return res
                    .status(400)
                    .json({ mensagem: 'Cliente não localizado' });
            }
        }
        if (rota === 'produto') {
            const idProdutoExiste = await knex('produtos')
                .where({ id })
                .first();

            if (!idProdutoExiste) {
                return res
                    .status(400)
                    .json({ mensagem: 'Produto não localizado' });
            }
        }
        if (rota === 'categoria') {
            const idExiste = await knex('categorias').where({ id }).first();

            if (!idExiste) {
                return res
                    .status(400)
                    .json({ mensagem: 'A categoria informada é invalida!' });
            }
        }
        next();
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message,
        });
    }
};

module.exports = validarParametroDeRota;
