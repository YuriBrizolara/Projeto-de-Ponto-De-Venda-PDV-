const joi = require('joi');

const schemaPedido = joi.object({
    cliente_id: joi.number().required().integer().positive().messages({
        'any.required': 'O campo ID de Cliente é obrigatório',
        'number.base': 'O campo ID de Cliente é obrigatório',
        'number.integer': 'Insira um ID de Cliente valido',
        'number.positive': 'Insira um ID de Cliente valido',
    }),

    observacao: joi.string().allow(null, ''),

    pedido_produtos: joi
        .array()
        .items(
            joi.object({
                produto_id: joi
                    .number()
                    .required()
                    .integer()
                    .positive()
                    .invalid(NaN)
                    .messages({
                        'any.required': 'O campo ID de Produto é obrigatório',
                        'number.base': 'O campo ID de Produto é obrigatório',
                        'number.integer': 'Insira um ID de Produto valido',
                        'number.positive': 'Insira um ID de Produto valido',
                        'number.invalid': 'Insira um ID de Produto válido',
                    }),

                quantidade_produto: joi
                    .number()
                    .required()
                    .positive()
                    .messages({
                        'any.required': 'O campo Quantidade é obrigatório',
                        'number.base': 'O campo Quantidade é obrigatório',
                        'number.integer': 'Insira uma Quantidade valido',
                        'number.positive': 'Insira uma Quantidade valido',
                    }),
            })
        )
        .min(1)
        .required()
        .messages({
            'any.required':
                'Nescessario informar produtos para o cadastro do pedido',
        }),
});

module.exports = schemaPedido;
