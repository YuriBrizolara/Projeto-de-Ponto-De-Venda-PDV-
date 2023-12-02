const knex = require("../conexão");

const validarCamposCliente = (schema) => async (req, res, next) => {
    const { email, cpf } = req.body;

    try {

        await schema.validateAsync(req.body);

        const cpfExiste = await knex('clientes').where({ cpf }).first();
        const emailExiste = await knex('clientes').where({ email }).first();
        if (emailExiste || cpfExiste) {
            return res.status(400).json({ 'mensagem': 'Dados já registrados em nossa base de dados' });
        }
        next();

    } catch (error) {
        return res.status(400).json({
            'mensagem': error.message
        })

    }


}

module.exports = {
    validarCamposCliente
};



