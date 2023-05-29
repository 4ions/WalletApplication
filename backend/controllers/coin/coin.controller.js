const { Coin } = require("../../db/models")

const controller = {
    getCoin: async (req, res) => {
        const id = req.params.id;

        if (!id) res.status(400).json({error: 'No se ha enviado el id'});

        const coin = await Coin.findByPk(id);

        if (!coin) res.status(404).json({error: 'No se ha encontrado la moneda'});

        return res.status(200).json(coin);

    },
    getCoins: async (req, res) => {
        const coins = await Coin.findAll();

        if (!coins) res.status(404).json({error: 'No se han encontrado monedas'});

        return res.status(200).json(coins);

    },
    createCoin: async (req, res) => {
        const { name, symbol, price } = req.body;

        if (!name || !symbol || !price) res.status(400).json({error: 'No se han enviado los datos necesarios'});

        const coin = await Coin.create({ name, symbol, price });

        if (!coin) return res.status(500).json({error: 'No se ha podido crear la moneda'});

        return res.status(201).json(coin);
        
    },
    deleteCoin: async (req, res) => {
        const id = req.params.id;

        if (!id) return res.status(400).json({error: 'No se ha enviado el id'});

        const coin = await Coin.findByPk(id);

        if (!coin) return res.status(404).json({error: 'No se ha encontrado la moneda'});

        await Coin.destroy({where: {id}});

        return res.status(204).json({message: 'Moneda eliminada correctamente'});
    },
    updateCoin: async (req, res) => {
        const id = req.params.id;
        
        if (!id) return res.status(400).json({error: 'No se ha enviado el id'});

        const { name, symbol, price } = req.body;

        if (!name || !symbol || !price) res.status(400).json({error: 'No se han enviado los datos necesarios'});

        const coin = await Coin.findByPk(id);

        if (!coin) return res.status(404).json({error: 'No se ha encontrado la moneda'});

        await Coin.update({ name, symbol, price }, {where: {id}});

        return res.status(200).json({message: 'Moneda actualizada correctamente'});
    }
}

module.exports = controller;