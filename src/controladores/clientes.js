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

const listarClientes = async (req,res) => {
    try {
        const todosClientes = await knex('clientes').select('*');
        return res.status(200).json(todosClientes);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao listar os clientes' });
    }
};
const detalharCliente = async (req,res) => {
    const { id } = req.params
    try {
        const clienteEncontrado = await knex('clientes').select('*').where('id',id);
        if (clienteEncontrado.length === 0 ) {
            return res.status(404).json({mensagem:'cliente não encontrado'})
        }
        return res.status(200).json(clienteEncontrado);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro ao detalhar o cliente' });
    }
};
module.exports = {
    editarCliente,
    listarClientes,
    detalharCliente
};
