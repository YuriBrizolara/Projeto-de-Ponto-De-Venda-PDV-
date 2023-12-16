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

const validarCorpo = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);

        next();
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message,
        });
    }
};

module.exports = { validarCorpo, verificarToken };
