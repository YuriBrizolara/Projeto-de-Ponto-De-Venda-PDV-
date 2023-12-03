const knex = require('../conexão');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const emailExiste = await knex('usuarios').where({ email }).first();

        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Esse email já existe' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await knex('usuarios')
            .insert({
                nome,
                email,
                senha: senhaCriptografada,
            })
            .returning(['nome', 'email']);

        return res.status(201).json(novoUsuario);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const detalharUsuario = async (req, res) => {
    try {
        return res.status(200).json(req.usuario);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do Servidor!' });
    }
};
const editarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.usuario;

    try {
        const usuarioExiste = await knex('usuarios').where({ id }).first();

        if (!usuarioExiste) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        if (email !== req.usuario.email) {
            const emailUsuarioExiste = await knex('usuarios')
                .where({ email })
                .first();

            if (emailUsuarioExiste) {
                return res
                    .status(400)
                    .json({ mensagem: 'O e-mail já existe.' });
            }
        }

        await knex('usuarios').where({ id }).update({
            nome,
            email,
            senha: senhaCriptografada,
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do Servidor!' });
    }
};

module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    editarUsuario,
};
