const joi = require('joi');

const schemaCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.base': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
    }),

    email: joi.string().email().required().messages({
        'string.email': 'O campo email precisa ter um formato válido',
        'string.base': 'O campo email é obrigatório',
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
    }),

    cpf: joi.string().min(11).max(11).allow(null, "").messages({
        'any.required': 'O campo cpf é obrigatório',
        'string.base': 'O campo cpf é obrigatório',
        'string.empty': 'O campo cpf é obrigatório',
        'string.max':
            'Insira um numero de cpf valido contendo 11 digitos e apenas numeros.',
        'string.min':
            'Insira um numero de cpf valido contendo 11 digitos e apenas numeros.',
    }),
    cep: joi.string().allow(null, ""),
    rua: joi.string().allow(null, ""),
    numero: joi.string().allow(null, ""),
    bairro: joi.string().allow(null, ""),
    cidade: joi.string().allow(null, ""),
    estado: joi.string().allow(null, "")
});

module.exports = schemaCliente;
