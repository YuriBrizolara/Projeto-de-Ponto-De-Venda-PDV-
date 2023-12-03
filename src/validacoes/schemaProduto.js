const joi = require('joi');

const schemaProduto = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.base': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição é obrigatório',
    }),
    quantidade_estoque: joi.number().required().integer().messages({
        'any.required': 'O campo quantidade estoque é obrigatório',
        'number.base': 'O campo quantidade estoque é obrigatório',
        'number.integer':
            'Insira um numero valido',
    }),

    valor: joi.number().required().integer().messages({
        'any.required': 'O campo valor é obrigatório',
        'number.base': 'O campo valor é obrigatório',
        'number.integer':
            'Insira um valor em centavos e sem vírgula',
    }),
    categoria_id: joi.number().required().integer().messages({
        'any.required': 'O campo Id da categoria é obrigatório',
        'number.base': 'O campo Id da categoria é obrigatório',
        'number.integer':
            'Insira uma Id da categoria valido, apenas numero',
    })
});

module.exports = schemaProduto;
