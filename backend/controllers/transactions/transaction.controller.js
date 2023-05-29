const { Transaction, User, Coin, UserCoin } = require('../../db/models');
const { getUserCoin, updateUserCoin } = require('../userCoins/dto/userCoins.dto');
const { Op } = require('sequelize');

const controller = {
    createTransaction: async (req, res) => {
        try{
            const {to, from} = req.params;

            if (!to || !from) return res.status(400).json({error: 'No se han enviado los parametros necesarios'});

            const userTo = await User.findOne({
                where: {
                    address: to
                }
            });

            if (!userTo) return res.status(404).json({error: 'No se ha encontrado el usuario'})

            const userFrom = await User.findOne({
                where: {
                    address: from
                }
            });

            if (!userFrom) return res.status(404).json({error: 'No se ha encontrado el usuario'})

            const {coin, amount} = req.body;

            if (!coin || !amount) return res.status(400).json({error: 'No se han enviado los datos necesarios en el cuerpo del mensaje'});

            const coinCheck = await Coin.findOne({
                where: {
                    name: coin
                }
            })

            if (!coinCheck) return res.status(404).json({error: 'No se ha encontrado la moneda'});

            const userCoins = await getUserCoin(userFrom.id, coinCheck.id);

            if ((!isNaN(parseFloat(amount)) && !isFinite(amount)) || isNaN(amount)) return res.status(400).json({error: 'El monto debe ser un float'});

            if (!userCoins || parseFloat(userCoins.amount) < parseFloat(amount)) return res.status(404).json({error: 'El usuario no cuenta con las monedas necesarias'});

            await updateUserCoin({
                userId: userFrom.id,
                coinId: coinCheck.id,
                amount: parseFloat(amount),
                operation: 'minus'
            });

            await updateUserCoin({
                userId: userTo.id,
                coinId: coinCheck.id,
                amount: parseFloat(amount),
                operation: 'plus'
            });
            
            const newTransaction = await Transaction.create({
                addressTo: to,
                addressFrom: from,
                coin: coin,
                amount: amount,
                timestamp: new Date()
            });

            return res.status(200).json(newTransaction);
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Error al crear la transaccion'});
        }
    },

// ...

getTransactions: async (req, res) => {
  const userId = req.params.userId;
  const page = req.query.page || 1; // Obtener el número de página de la consulta, si no se proporciona, usar página 1
  const limit = 10; // Número de transacciones por página

  if (!userId) return res.status(400).json({ error: 'No se ha enviado el id del usuario' });

  const user = await User.findByPk(userId);

  if (!user) return res.status(404).json({ error: 'No se ha encontrado el usuario' });

  try {
    const transactions = await Transaction.findAndCountAll({
      where: {
        [Op.or]: [
          { addressFrom: user.address },
          { addressTo: user.address },
        ],
      },
      limit,
      offset: (page - 1) * limit,
    });

    const paginatedTransactions = transactions.rows.map((transaction) => ({
      type: transaction.addressFrom === user.address ? 'Send' : 'Receive',
      details: transaction,
    }));

    return res.status(200).json({
      transactions: paginatedTransactions,
      totalPages: Math.ceil(transactions.count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return res.status(500).json({ error: 'Error al obtener las transacciones' });
  }
},

      
}

module.exports = controller;