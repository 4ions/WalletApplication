const { UserCoin, User } = require('../../db/models');
const { getUserCoins } = require('./dto/userCoins.dto');

const controller = {
    getUser: async (req, res) => {
        const userId = req.params.userId;

        if (!userId) return res.status(400).json({error: 'No se ha enviado el id'});
        const user = await User.findByPk(userId);
        
        if (!user) return res.status(404).json({error: 'No se ha encontrado el usuario'});

        const userCoins = await getUserCoins(userId);

        return res.status(200).json(userCoins);

    },
    getUserCoins: async (req, res) => {
        try{
            const userCoins = await UserCoin.findAll();
    
            return res.status(200).json(userCoins);

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Error al obtener las monedas del usuario'});
        }
    }
}

module.exports = controller;