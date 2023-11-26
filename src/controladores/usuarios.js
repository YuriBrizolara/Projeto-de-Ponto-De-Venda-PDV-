const knex = require('../conexão');
const bcrypt = require('bcrypt');

const cadastrarUsuario= async(req,res) =>{
    const { nome, email, senha } = req.body;

    try {
        const emailExiste = await knex('usuarios').where({ email }).first();

        if(emailExiste){
            return res.status(400).json({'mensagem': 'Esse email já existe'});
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCriptografada
        }).returning(['nome', 'email']);

        return res.status(201).json(novoUsuario)

    } catch (error) {
        return res.status(500).json(error.message);
    }
}
const detalharUsuario= async(req,res) =>{
    return res.status(200).json(req.usuario);
}
const editarUsuario= async(req,res) =>{

}

module.exports={
    cadastrarUsuario,
    detalharUsuario,
    editarUsuario
}
