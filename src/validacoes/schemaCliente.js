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

    cpf: joi.number().min(11).required().integer().messages({
        'any.required': 'O campo cpf é obrigatório',
        'number.base': 'O campo cpf é obrigatório',
        'number.integer':
            'Insira um numero de cpf valido contendo 11 digitos e apenas numeros.',
    }),
});

module.exports = schemaCliente;
