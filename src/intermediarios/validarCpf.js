const knex = require('../conexão');

const validarCpf_Email = async (req, res, next) => {
    const { email, cpf } = req.body;
    const { id } = req.params;

    try {
        if (cpf && email) {
            let query = knex('clientes')
                .select('*')
                .where(function () {
                    this.where('email', email).orWhere('cpf', cpf);
                });

            if (id) {
                query = query.whereNot('id', id);
            }

            const clientesComMesmoEmailOuCpf = await query;

            if (clientesComMesmoEmailOuCpf.length > 0) {
                return res
                    .status(400)
                    .json({ mensagem: 'Email ou CPF já cadastrado' });
            }
        }

        next();
    } catch (error) {
        return res.status(400).json({
            mensagem: 'Erro interno do servidor',
        });
    }
};
module.exports = validarCpf_Email;
