const knex = require('../conexão');

const editarCliente = async (req, res) => {
    const { nome, email, cpf } = req.body;
    const { id } = req.params;
    try {
        const clientesComMesmoEmailOuCpf = await knex('clientes')
            .select('*')
            .where(function () {
                this.where('email', email).orWhere('cpf', cpf);
            })
            .andWhereNot('id', id);

        if (clientesComMesmoEmailOuCpf.length > 0) {
            return res
                .status(400)
                .json({ mensagem: 'Email ou Cpf já cadastrado' });
        }

        const atualizarCliente = await knex('clientes')
            .update({
                nome,
                email,
                cpf,
            })
            .returning(['nome', 'email', 'cpf']);

        if (atualizarCliente.length > 0) {
            return res.status(200).json({
                mensagem: 'Alteração realizada',
                dados: atualizarCliente[0],
            });
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = { editarCliente };
