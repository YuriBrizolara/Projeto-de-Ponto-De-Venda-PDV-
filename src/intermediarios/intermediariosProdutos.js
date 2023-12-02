const knex = require('../conexão');

const validarCamposProduto = (schema) => async (req, res, next) => {
    const { categoria_id } = req.body;
    try {
        await schema.validateAsync(req.body);
        const idExiste = await knex('categorias')
            .where({ id: categoria_id })
            .first();
        if (!idExiste) {
            return res
                .status(400)
                .json({ mensagem: 'A categoria informada é invalida!' });
        }

        next();
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message,
        });
    }
};

module.exports = { validarCamposProduto };
