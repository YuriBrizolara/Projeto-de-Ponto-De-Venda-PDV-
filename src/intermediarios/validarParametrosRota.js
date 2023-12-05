const validarParametroDeRota = (req, res, next) => {
    const { id } = req.params;

    if (id === undefined || isNaN(Number(id))) {
        return res
            .status(400)
            .json({
                mensagem:
                    'ID do produto invalido! Insira um numero de ID valido',
            });
    }
    next();
};

module.exports = validarParametroDeRota;