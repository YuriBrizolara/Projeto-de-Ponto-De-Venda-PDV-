const knex = require('../conexão');
const validarParametroDeRota = (rota) => async (req, res, next) => {
    const { id } = req.params;

    try {
        if (id === undefined || isNaN(Number(id))) {
            return res.status(400).json({
                mensagem: 'Insira um numero de ID valido!',
            });
        }
        const localizarId = await knex(rota).where({ id }).first();
        if (!localizarId) {
            return res.status(404).json({ mensagem: 'Id não localizado' });
        }

        next();
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message,
        });
    }
};

module.exports = validarParametroDeRota;
