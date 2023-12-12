const validarParametroDeRota = (req, res, next) => {
    const { id, idProduto } = req.params;

    if (!id && !idProduto) {
        return res.status(400).json({
            mensagem: 'Insira um numero de ID valido'
        });
    };

    if (id) {
        if (id === undefined || isNaN(Number(id))) {
            return res.status(400).json({
                mensagem: 'ID do produto invalido! Insira um numero de ID valido'
            });
        };
    };
    if (idProduto) {
        if (idProduto === undefined || isNaN(Number(idProduto))) {
            return res.status(400).json({
                mensagem: 'ID do produto invalido! Insira um numero de ID valido'
            });
        };
    };
    next();
};

module.exports = validarParametroDeRota;
