const bcrypt = require('bcrypt');
const knex = require('../conexão');
const jwt = require('jsonwebtoken');
const efetuarLogin = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await knex('usuarios').where({ email }).first();
        if (!usuario) {
            return res.status(400).json('Usuário não encontrado');
        }
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(400).json('Email ou senha não confere');
        }
        const token = jwt.sign(
            { id: usuario.id },
            process.env.CHAVE_PRIVADA_JWT,
            { expiresIn: '8h' }
        );
        const { senha: _, ...dadosUsuario } = usuario;
        return res.status(200).json({
            usuario: dadosUsuario,
            token,
        });
    } catch (error) {
        return res.status(400).json('Erro ao efetuar o login');
    }
};
module.exports = efetuarLogin;
