const knex = require('../conexão');
const jwt = require('jsonwebtoken');

const verificarToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ mensagem: 'Token inválido' });
    }
    const token = authorization.split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.CHAVE_PRIVADA_JWT);
        const usuarioEncontrado = await knex('usuarios').where({ id }).first();
        if (!usuarioEncontrado) {
            return res.status(404).json('Usuario não encontrado');
        }
        const { senha, ...usuario } = usuarioEncontrado;
        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Usuario não autorizado' });
    }
};

const validarDados = (schema) => async (req, res, next) => {
    // const { email, cpf, categoria_id } = req.body;
    // const { id } = req.params;

    // //alterar mensagem nos schemas para mensagem generica caso falte dados (cadastro, atualização)
    try {
        await schema.validateAsync(req.body);

        // if (cpf && email) {
        //     let query = knex('clientes')
        //         .select('*')
        //         .where(function () {
        //             this.where('email', email).orWhere('cpf', cpf);
        //         });

        //     if (id) {
        //         query = query.whereNot('id', id);
        //     }

        //     const clientesComMesmoEmailOuCpf = await query;

        //     if (clientesComMesmoEmailOuCpf.length > 0) {
        //         return res
        //             .status(400)
        //             .json({ mensagem: 'Email ou CPF já cadastrado' });
        //     }
        // }
        // if (categoria_id) {
        //     const idExiste = await knex('categorias')
        //         .where({ id: categoria_id })
        //         .first();

        //     if (!idExiste) {
        //         return res
        //             .status(400)
        //             .json({ mensagem: 'A categoria informada é invalida!' });
        //     }
        // }
        next();
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message,
        });
    }
};

module.exports = { validarDados, verificarToken };
