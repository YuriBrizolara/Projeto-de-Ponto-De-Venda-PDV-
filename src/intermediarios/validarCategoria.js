const knex = require('../conexão');
const validarCategoria = async (req, res, next) => {
    const { categoria_id } = req.body;
    try {
        if (categoria_id) {
            const idExiste = await knex('categorias')
                .where({ id: categoria_id })
                .first();

            if (!idExiste) {
                return res
                    .status(400)
                    .json({ mensagem: 'A categoria informada é invalida!' });
            }
        }
        next();
    } catch (error) {
        return res.status(400).json({
            mensagem: 'Erro interno do servidor',
        });
    }
};
module.exports = validarCategoria;
